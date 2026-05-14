import React from 'react';

const LegalPage = ({ type }) => {
  const content = {
    policy: { title: "Обработка персональных данных", text: "Здесь будет текст вашей политики обработки данных..." },
    terms: { title: "Пользовательское соглашение", text: "Условия использования сервиса Van Blade..." },
    privacy: { title: "Политика конфиденциальности", text: "Мы заботимся о ваших данных..." }
  };

  const current = content[type];

  return (
    <div style={{ padding: '100px 20px', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <h1 style={{ color: '#d4af37', fontFamily: 'serif' }}>{current.title}</h1>
      <div style={{ lineHeight: '1.6', marginTop: '30px', opacity: 0.8 }}>
        <p>{current.text}</p>
        <p>Это шаблонный текст. Пожалуйста, замените его на реальные юридические документы вашего региона.</p>
      </div>
    </div>
  );
};

export default LegalPage;