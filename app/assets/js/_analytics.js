window.analytics = window.analytics || {
  virtualPageView(path, title) {
    window.dataLayer.push({
      event: 'pageView',
      virtualPageViewPath: path,
      virtualPageViewTitle: title,
    });
  },
};
