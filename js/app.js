/**
 * WeBreak 破冰 - 主应用逻辑
 * 负责页面路由、表单交互、卡片生成和导出
 */

(function() {
  'use strict';

  // ========== 状态管理 ==========
  const state = {
    currentPage: 'home', // home | edit | preview | cards | profile
    formData: {
      name: '',
      chatStyle: [],     // 多选
      replySpeed: '',    // 单选
      preference: [],    // 多选
      mbti: '',          // 单选
      note: '',
      // V1.5 新增选填字段
      interests: [],     // 多选，最多 3
      job: '',           // 单选 + 自定义
      food: [],          // 多选，最多 2
      city: '',          // 单选 + 自定义
    },
    currentQuote: '',
    savedCards: [],       // localStorage 持久化
  };

  // ========== DOM 引用 ==========
  const pages = {
    home: document.getElementById('pageHome'),
    edit: document.getElementById('pageEdit'),
    preview: document.getElementById('pagePreview'),
  };

  const topBarAction = document.getElementById('topBarAction');

  // ========== 初始化 ==========
  function init() {
    bindNavigation();
    bindFormInteractions();
    bindPreviewActions();
    bindHomeActions();
  }

  // ========== 页面路由 ==========
  function navigateTo(pageName, direction) {
    const prevPage = state.currentPage;
    if (prevPage === pageName) return;

    const prevEl = pages[prevPage];
    const nextEl = pages[pageName];

    if (!nextEl) return;

    // 退出当前页面
    if (prevEl) {
      prevEl.classList.remove('active');
      if (direction === 'forward') {
        prevEl.classList.add('slide-left');
      }
    }

    // 进入新页面
    setTimeout(() => {
      // 重置所有页面状态
      Object.values(pages).forEach(p => {
        p.classList.remove('active', 'slide-left');
      });
      nextEl.classList.add('active');
      // 滚动到顶部
      nextEl.scrollTop = 0;
      window.scrollTo(0, 0);
    }, direction ? 50 : 0);

    state.currentPage = pageName;
    updateNavState(pageName);
    updateTopBar(pageName);

    // 编辑页的生成按钮显示控制
    const genWrapper = document.getElementById('generateBtnWrapper');
    if (genWrapper) {
      genWrapper.style.display = pageName === 'edit' ? '' : 'none';
    }
  }

  function updateNavState() {
    // 底部导航已删除，无需操作
  }

  function updateTopBar(pageName) {
    const actionIcon = topBarAction.querySelector('.material-symbols-outlined');
    if (pageName === 'edit') {
      actionIcon.textContent = 'close';
      topBarAction.onclick = () => navigateTo('home', 'back');
    } else if (pageName === 'preview') {
      actionIcon.textContent = 'close';
      topBarAction.onclick = () => navigateTo('home', 'back');
    } else {
      actionIcon.textContent = 'share';
      topBarAction.onclick = null;
    }
  }

  // ========== 导航绑定 ==========
  function bindNavigation() {
    // 底部导航已删除，无需绑定
  }

  // ========== 首页操作 ==========
  function bindHomeActions() {
    document.getElementById('btnStartCreate').addEventListener('click', () => {
      navigateTo('edit', 'forward');
    });
  }

  // ========== 表单交互 ==========
  function bindFormInteractions() {
    // 胶囊标签组 - 通用事件委托
    document.querySelectorAll('.chip-group').forEach(group => {
      const type = group.dataset.type; // 'single' 或 'multi'

      group.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;

        if (type === 'single') {
          // 单选：取消同组其他选中
          group.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
        } else {
          // 多选：切换选中状态
          const maxCount = parseInt(group.dataset.max) || Infinity;
          if (!chip.classList.contains('selected')) {
            // 检查是否已达上限
            const currentCount = group.querySelectorAll('.chip.selected').length;
            if (currentCount >= maxCount) return; // 已达上限，不允许再选
          }
          chip.classList.toggle('selected');
        }
      });
    });

    // 折叠区：展开/收起
    const collapseTrigger = document.getElementById('collapseTrigger');
    const collapseContent = document.getElementById('collapseContent');
    const collapseArrow = document.getElementById('collapseArrow');
    if (collapseTrigger) {
      collapseTrigger.addEventListener('click', () => {
        collapseContent.classList.toggle('expanded');
        collapseArrow.classList.toggle('rotated');
      });
    }

    // MBTI 弹窗交互
    const mbtiTrigger = document.getElementById('mbtiTrigger');
    const mbtiSheet = document.getElementById('mbtiSheet');
    const mbtiOverlay = document.getElementById('mbtiOverlay');
    const mbtiSheetClose = document.getElementById('mbtiSheetClose');

    function openMbtiSheet() {
      mbtiSheet.classList.add('active');
      mbtiOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMbtiSheet() {
      mbtiSheet.classList.remove('active');
      mbtiOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    mbtiTrigger.addEventListener('click', openMbtiSheet);
    mbtiOverlay.addEventListener('click', closeMbtiSheet);
    mbtiSheetClose.addEventListener('click', closeMbtiSheet);

    // 弹窗内 MBTI 选择 - 单选
    mbtiSheet.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        mbtiSheet.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        // 更新触发按钮文字
        const triggerText = document.getElementById('mbtiTriggerText');
        triggerText.textContent = chip.dataset.value;
        triggerText.classList.add('has-value');
        // 延迟关闭弹窗
        setTimeout(closeMbtiSheet, 200);
      });
    });

    // 生成按钮
    document.getElementById('btnGenerate').addEventListener('click', handleGenerate);
  }

  function collectFormData() {
    state.formData.name = document.getElementById('inputName').value.trim();

    state.formData.chatStyle = Array.from(
      document.querySelectorAll('#chipChatStyle .chip.selected')
    ).map(c => c.dataset.value);
    // 加上自定义输入
    const customChat = document.getElementById('inputChatStyleCustom').value.trim();
    if (customChat) state.formData.chatStyle.push(customChat);

    const selectedSpeed = document.querySelector('#chipReplySpeed .chip.selected');
    state.formData.replySpeed = selectedSpeed ? selectedSpeed.dataset.value : '';
    // 自定义回复节奏覆盖
    const customSpeed = document.getElementById('inputReplySpeedCustom').value.trim();
    if (customSpeed) state.formData.replySpeed = customSpeed;

    state.formData.preference = Array.from(
      document.querySelectorAll('#chipPreference .chip.selected')
    ).map(c => c.dataset.value);

    const selectedMbti = document.querySelector('#mbtiSheet .chip.selected');
    state.formData.mbti = selectedMbti ? selectedMbti.dataset.value : '';

    state.formData.note = document.getElementById('inputNote').value.trim();

    // V1.5 新增字段
    state.formData.interests = Array.from(
      document.querySelectorAll('#chipInterests .chip.selected')
    ).map(c => c.dataset.value);
    const customInterests = document.getElementById('inputInterestsCustom').value.trim();
    if (customInterests) state.formData.interests.push(customInterests);

    const selectedJob = document.querySelector('#chipJob .chip.selected');
    state.formData.job = selectedJob ? selectedJob.dataset.value : '';
    const customJob = document.getElementById('inputJobCustom').value.trim();
    if (customJob) state.formData.job = customJob;

    state.formData.food = Array.from(
      document.querySelectorAll('#chipFood .chip.selected')
    ).map(c => c.dataset.value);
    const customFood = document.getElementById('inputFoodCustom').value.trim();
    if (customFood) state.formData.food.push(customFood);

    const selectedCity = document.querySelector('#chipCity .chip.selected');
    state.formData.city = selectedCity ? selectedCity.dataset.value : '';
    const customCity = document.getElementById('inputCityCustom').value.trim();
    if (customCity) state.formData.city = customCity;
  }

  function handleGenerate() {
    collectFormData();

    // 验证：至少填写昵称
    if (!state.formData.name) {
      shakeElement(document.getElementById('inputName'));
      document.getElementById('inputName').focus();
      return;
    }

    // 生成卡片
    renderResultCard();
    navigateTo('preview', 'forward');
  }

  // ========== 卡片渲染 ==========
  // MBTI 中文名称映射
  const MBTI_NAMES = {
    INTJ: '建筑师', INTP: '逻辑学家', ENTJ: '指挥官', ENTP: '辩论家',
    INFJ: '提倡者', INFP: '调停者', ENFJ: '主人公', ENFP: '竞选者',
    ISTJ: '物流师', ISFJ: '守卫者', ESTJ: '总经理', ESFJ: '执政官',
    ISTP: '鉴赏家', ISFP: '探险家', ESTP: '企业家', ESFP: '表演者',
  };

  function renderResultCard() {
    const { name, chatStyle, replySpeed, preference, mbti, note } = state.formData;

    // 名字
    document.getElementById('resultName').textContent = name;

    // MBTI
    const mbtiEl = document.getElementById('resultMbti');
    if (mbti) {
      const mbtiName = MBTI_NAMES[mbti] || '';
      mbtiEl.textContent = mbti + (mbtiName ? ' · ' + mbtiName : '');
      mbtiEl.style.display = '';
    } else {
      mbtiEl.style.display = 'none';
    }

    // 聊天风格描述
    const chatStyleText = chatStyle.length > 0
      ? chatStyle.map(s => CHAT_STYLE_DESC[s] || s).join('、')
      : '随心交流';
    document.getElementById('resultChatStyle').textContent = chatStyleText;

    // 回复节奏
    const replySpeedText = replySpeed
      ? (REPLY_SPEED_DESC[replySpeed] || replySpeed)
      : '随缘回复';
    document.getElementById('resultReplySpeed').textContent = replySpeedText;

    // 相处偏好描述
    const prefText = preference.length > 0
      ? preference.map(p => PREFERENCE_DESC[p] || p).join('、')
      : '真诚相处';
    document.getElementById('resultPreference').textContent = prefText;

    // V1.5 标签区：分组短句式，每行显示类别名
    const { interests, job, food, city } = state.formData;
    const tagRows = [];
    if (job) tagRows.push({ icon: '💼', label: '工作', text: job });
    if (interests.length > 0) tagRows.push({ icon: '🎯', label: '兴趣', text: interests.join('、') });
    if (food.length > 0) tagRows.push({ icon: '🍜', label: '美食', text: food.join('、') });
    if (city) tagRows.push({ icon: '📍', label: '城市', text: city });

    const tagsContainer = document.getElementById('resultTags');
    const tagsList = document.getElementById('resultTagsList');
    if (tagRows.length > 0) {
      tagsList.innerHTML = tagRows.map(r =>
        '<div class="result-card__tag-row">' +
          '<span class="result-card__tag-icon">' + r.icon + '</span>' +
          '<div class="result-card__tag-content">' +
            '<div class="result-card__tag-label">' + r.label + '</div>' +
            '<div class="result-card__tag-text">' + r.text + '</div>' +
          '</div>' +
        '</div>'
      ).join('');
      tagsContainer.style.display = '';
    } else {
      tagsContainer.style.display = 'none';
    }

    // 备注/引语
    if (note) {
      document.getElementById('resultQuote').textContent = '"' + note + '"';
      state.currentQuote = note;
    } else {
      const quote = getRandomQuote(mbti, null);
      document.getElementById('resultQuote').textContent = quote;
      state.currentQuote = quote;
    }
  }

  // ========== 预览页操作 ==========
  function bindPreviewActions() {
    // 保存到相册
    document.getElementById('btnSave').addEventListener('click', handleSaveCard);

    // 返回修改
    document.getElementById('btnBackEdit').addEventListener('click', () => {
      navigateTo('edit', 'back');
    });

    // 换一句备注
    document.getElementById('btnRefreshQuote').addEventListener('click', () => {
      const newQuote = getRandomQuote(state.formData.mbti, state.currentQuote);
      document.getElementById('resultQuote').textContent = newQuote;
      state.currentQuote = newQuote;
    });
  }

  async function handleSaveCard() {
    const cardEl = document.getElementById('resultCard');
    const saveBtn = document.getElementById('btnSave');

    // 历史功能已移除，无需再保存

    // 确保 dom-to-image-more 已加载
    if (typeof domtoimage === 'undefined') {
      await loadDomToImage();
    }

    try {
      saveBtn.textContent = '正在生成...';

      // 等待字体加载完成
      await document.fonts.ready;

      // 临时去掉阴影和 margin（不影响页面展示，截完恢复）
      const origBoxShadow = cardEl.style.boxShadow;
      const origMargin = cardEl.style.margin;
      cardEl.style.boxShadow = 'none';
      cardEl.style.margin = '0';

      // 获取卡片实际尺寸
      const cardWidth = cardEl.offsetWidth;
      const cardHeight = cardEl.offsetHeight;
      const pixelRatio = 3; // 3 倍清晰度

      // 使用 dom-to-image-more 导出（SVG foreignObject，浏览器自己渲染，像素级一致）
      const dataUrl = await domtoimage.toPng(cardEl, {
        width: cardWidth,
        height: cardHeight,
        style: {
          margin: '0',
          boxShadow: 'none',
        },
        quality: 1,
        // 3 倍像素比保证高清
        width: cardWidth * pixelRatio,
        height: cardHeight * pixelRatio,
        style: {
          transform: 'scale(' + pixelRatio + ')',
          transformOrigin: 'top left',
          width: cardWidth + 'px',
          height: cardHeight + 'px',
        },
      });

      // 恢复阴影和 margin
      cardEl.style.boxShadow = origBoxShadow;
      cardEl.style.margin = origMargin;

      // 下载图片
      downloadDataUrl(dataUrl, 'webreak-card-' + state.formData.name + '.png');
      saveBtn.innerHTML = '<span class="material-symbols-outlined">check</span> 已保存';
      setTimeout(() => {
        saveBtn.innerHTML = '<span class="material-symbols-outlined">download</span> 保存破冰卡片到相册';
      }, 2000);
    } catch (err) {
      console.error('导出失败:', err);
      // 恢复样式
      cardEl.style.boxShadow = '';
      cardEl.style.margin = '';
      saveBtn.innerHTML = '<span class="material-symbols-outlined">download</span> 保存破冰卡片到相册';
      fallbackSave();
    }
  }

  function downloadDataUrl(dataUrl, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function loadDomToImage() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/dom-to-image-more@3.4.5/dist/dom-to-image-more.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function fallbackSave() {
    // 降级：提示用户截屏
    alert('图片导出暂不可用，请使用手机截屏保存卡片。');
  }

  // ========== 工具函数 ==========
  function shakeElement(el) {
    el.style.animation = 'none';
    el.offsetHeight; // 触发回流
    el.style.animation = 'shake 0.4s ease';
    el.style.border = '2px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--error').trim();
    setTimeout(() => {
      el.style.border = '';
      el.style.animation = '';
    }, 2000);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // 添加 shake 动画
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  // ========== 启动 ==========
  document.addEventListener('DOMContentLoaded', init);
})();
