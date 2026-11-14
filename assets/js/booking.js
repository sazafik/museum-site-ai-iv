/* Надсилання заявки з форми запису в Google Форму музею.
   Відповіді потрапляють у Google Форму (вкладка «Відповіді») та, за бажанням, у прив'язану Google Таблицю.
   Українська й англійська версії сайту надсилають в одну форму; напрям завжди пишеться українською,
   а в полі «Мова сайту» видно, з якої версії прийшла заявка.
   Google не дозволяє сайтам читати відповідь форми (CORS), тому запит іде в режимі no-cors:
   якщо мережа відповіла — вважаємо заявку надісланою; якщо мережі немає — показуємо помилку.
   Щоб перевірити стан «не вдалося надіслати», відкрийте сторінку з ?fail=1.
   Якщо в Google Формі змінюватимете питання, оновіть ідентифікатори entry.* нижче. */
(function () {
  // Форма «Заявки з сайту музею» на Google Диску: https://docs.google.com/forms/d/1MWByX6JgoZR5MBz4_xtew02H95yBFSm6oGaK0eXsbcc/edit
  var FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfZt_orVUu6dJRcewKXll4ryHNu0nmegMsl51gh6oDjOCqT0w/formResponse';
  var FIELDS = {
    direction: 'entry.1337153375',
    name: 'entry.217062930',
    phone: 'entry.556226827',
    lang: 'entry.966406379'
  };

  function directionLabel(code) {
    var c = window.SCM_CONTENT;
    var dict = c && c.uk && c.uk.dirLabels;
    return (dict && dict[code]) || code;
  }

  window.submitBooking = function (data) {
    if (/[?&]fail=1\b/.test(window.location.search)) {
      return Promise.reject(new Error('booking: fail=1'));
    }
    var body = new URLSearchParams();
    body.append(FIELDS.direction, directionLabel(data.direction));
    body.append(FIELDS.name, data.name);
    body.append(FIELDS.phone, data.phone);
    body.append(FIELDS.lang, data.lang === 'en' ? 'EN' : 'UA');
    return fetch(FORM_ACTION, { method: 'POST', mode: 'no-cors', body: body })
      .then(function () { return { ok: true, data: data }; });
  };
})();
