

$(document).ready(function() {
  var couponExpires, couponExpiresTime, expiresTime, hourExpiresTime, now, setCookie, todayAtMidn;
  now = new Date();
  todayAtMidn = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  couponExpires = new Date(helper.getParameterByName('couponExpires'));
  couponExpiresTime = ((couponExpires - now) + 86400000) / 86400000;
  hourExpiresTime = 1 / 24;
  expiresTime = 0;
  if (couponExpiresTime && couponExpiresTime < 0) {

  } else if (couponExpiresTime && couponExpiresTime > 0 && couponExpiresTime < hourExpiresTime) {
    expiresTime = couponExpiresTime;
  } else if (couponExpiresTime && couponExpiresTime > 0 && couponExpiresTime > hourExpiresTime) {
    expiresTime = hourExpiresTime;
  }
  setCookie = function(name, value) {
    return $.cookie(name, value, {
      expires: expiresTime,
      path: '/'
    });
  };
  $.each($('.couponCode-link'), function(i, item) {
    var cookieCoupon, thisCoupon, thisCouponCode, thisLink;
    thisCoupon = $(item).attr('data-coupon') || 'couponCode';
    thisCouponCode = helper.getParameterByName(thisCoupon);
    cookieCoupon = $.cookie(thisCoupon);
    thisLink = $(item).attr('data-link');
    if (thisCouponCode) {
      $(item).prop('href', thisLink + '?couponCode=' + thisCouponCode);
      setCookie(thisCoupon, thisCouponCode);
    } else if (cookieCoupon) {
      $(item).prop('href', thisLink + '?couponCode=' + cookieCoupon);
    }
  });
  $.each($('.payCode-link'), function(i, item) {
    var cookiePay, thisLink, thisPay, thisPayCode;
    thisPay = $(item).attr('data-pay');
    thisPayCode = helper.getParameterByName(thisPay);
    cookiePay = $.cookie(thisPay);
    thisLink = $(item).attr('data-link');
    if (thisPayCode) {
      $(item).prop('href', thisLink + thisPayCode);
      setCookie(thisPay, thisPayCode);
    } else if (cookiePay) {
      $(item).prop('href', thisLink + cookiePay);
    }
  });
});

var appCourse, config, database;

config = {
  apiKey: "AIzaSyB3fJc8UXsIOztV8_TsVevx9p3NWD9mxqw",
  authDomain: "hexschool-api.firebaseapp.com",
  databaseURL: "https://hexschool-api.firebaseio.com",
  storageBucket: "hexschool-api.appspot.com"
};

firebase.initializeApp(config);

database = firebase.database();

database.ref('/udemy-api').on('value', function(snapshot) {
  return appCourse.course = snapshot.val();
});

appCourse = new Vue({
  el: '#course-progress',
  data: {
    course: {},
    courseProgress: [],
    basicVaule: 50,
    current: 0
  }
});

appCourse.courseProgress = [
  {
    name: '設計容易讓人衝動購買的文案設計',
    goal: '250'
  }, {
    name: '商務網頁必用的前端互動效果',
    goal: '500'
  }, {
    name: '七種不可犯的 UI/UX 錯誤',
    goal: '750'
  }, {
    name: '7hr 線上直播課程：如何打造一頁式金流商務網頁',
    goal: '1000'
  }
];

var helper;

helper = {
  getParameterByName: function(name, url) {
    var regex, results;
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
    results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
};
