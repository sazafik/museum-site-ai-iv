/* Інтерактивні ілюстрації для статей (вбудовуються як SVG у сторінку).
   Кожна функція отримує t(uk, en) — вибір тексту потрібною мовою — і повертає <svg>.
   Стан «увімкнено» вмикає клас .on на <figure>; анімації описано в assets/css/site.css (.ill-art …). */
'use strict';

const W = 480, H = 260;
const svg = (label, body) =>
  `<svg class="ill-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">${body}</svg>`;
// Детермінована «випадкова» затримка, щоб лампи блимали врозбій, але однаково при кожній збірці
const delay = i => ((i * 137) % 1600) + 'ms';
const text = (x, y, s, cls = 't', anchor = 'start') => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

module.exports = {
  /* Стаття 1. МЕСМ: зала з лампами, термометр, розібрана стеля */
  mesm(t) {
    let lamps = '', n = 0;
    for (const rx of [36, 160, 284]) {
      for (let r = 0; r < 8; r++) for (let c = 0; c < 6; c++) {
        lamps += `<rect class="lamp" x="${rx + 12 + c * 15}" y="${72 + r * 17}" width="8" height="10" style="--d:${delay(n++)}"/>`;
      }
    }
    return svg(t('МЕСМ: зала з шафами, повними ламп', 'MESM: a hall of cabinets full of tubes'), `
      <rect class="bg" width="${W}" height="${H}"/>
      <path class="ln" d="M16 40H180M220 40H464"/>
      <rect class="ceil" x="180" y="34" width="40" height="8"/>
      ${[36, 160, 284].map(x => `<rect class="bx" x="${x}" y="60" width="112" height="160"/>`).join('')}
      ${lamps}
      <path class="ln" d="M16 222H464"/>
      ${[92, 216, 340].map((x, i) => `<path class="heat" style="--d:${i * 300}ms" d="M${x - 16} 56q8-8 0-16t0-16M${x} 56q8-8 0-16t0-16M${x + 16} 56q8-8 0-16t0-16"/>`).join('')}
      <rect class="bx" x="420" y="70" width="16" height="130"/>
      <rect class="merc" x="425" y="80" width="6" height="120"/>
      <rect class="merc-base" x="418" y="198" width="20" height="16"/>
      ${text(428, 62, '°C', 't', 'middle')}
      ${text(36, 246, t('≈ 6000 ЛАМП · 25 кВт · 60 м²', '≈ 6,000 TUBES · 25 kW · 60 m²'))}
      ${text(464, 246, t('ВИМКНЕНО', 'OFF'), 't off-only', 'end')}
      ${text(464, 246, t('50 ДІЙ/С', '50 OPS/S'), 't on-only', 'end')}
    `);
  },

  /* Стаття 2. Пристрій керування — «диригент», що по черзі дає команди іншим блокам */
  control(t) {
    const blocks = [
      [24, 24, t("ПАМ'ЯТЬ", 'MEMORY')], [336, 24, t('АРИФМЕТИКА', 'ARITHMETIC')],
      [24, 176, t('ВВЕДЕННЯ', 'INPUT')], [336, 176, t('ВИВЕДЕННЯ', 'OUTPUT')],
    ];
    const order = [2, 0, 1, 3]; // введення → пам'ять → арифметика → виведення
    const wires = [
      'M180 110H120V68', 'M300 110H360V68', 'M180 150H120V176', 'M300 150H360V176',
    ];
    return svg(t('Пристрій керування по черзі вмикає блоки машини', 'The control unit switches on the machine blocks in turn'), `
      <rect class="bg" width="${W}" height="${H}"/>
      ${wires.map(d => `<path class="ln" d="${d}"/>`).join('')}
      ${wires.map((d, i) => `<path class="pulse" d="${d}" style="--d:${order.indexOf(i) * 600}ms"/>`).join('')}
      ${blocks.map(([x, y, s], i) => `<g class="blk" style="--d:${order.indexOf(i) * 600 + 250}ms"><rect class="bx" x="${x}" y="${y}" width="120" height="44"/>${text(x + 60, y + 27, s, 't', 'middle')}</g>`).join('')}
      <rect class="bx strong" x="180" y="96" width="120" height="68"/>
      ${text(240, 122, t('ПРИСТРІЙ', 'CONTROL'), 't', 'middle')}
      ${text(240, 140, t('КЕРУВАННЯ', 'UNIT'), 't', 'middle')}
      <path class="baton" d="M226 154l28-6"/>
      ${text(240, 246, t('ВВЕДЕННЯ > ПАМ\'ЯТЬ > АРИФМЕТИКА > ВИВЕДЕННЯ', 'INPUT > MEMORY > ARITHMETIC > OUTPUT'), 't dim-t', 'middle')}
    `);
  },

  /* Стаття 3. «Дніпро» керує конвеєром */
  dnipro(t) {
    let lamps = '';
    for (let i = 0; i < 12; i++) lamps += `<rect class="lamp" x="${44 + (i % 4) * 22}" y="${92 + Math.floor(i / 4) * 18}" width="10" height="8" style="--d:${delay(i)}"/>`;
    const gear = (cx, cy) => `<g class="gear"><circle class="bx" cx="${cx}" cy="${cy}" r="16"/><path class="ln" d="M${cx - 16} ${cy}H${cx + 16}M${cx} ${cy - 16}V${cy + 16}"/></g>`;
    return svg(t('ЕОМ «Дніпро» керує конвеєром на заводі', 'The Dnipro computer controls a factory conveyor'), `
      <rect class="bg" width="${W}" height="${H}"/>
      <rect class="bx" x="30" y="40" width="112" height="180"/>
      ${text(86, 70, t('ДНІПРО', 'DNIPRO'), 't', 'middle')}
      ${lamps}
      <rect class="bx" x="44" y="160" width="84" height="40"/>
      <path class="ln" d="M142 130H210V60H300"/>
      <path class="pulse loop" d="M142 130H210V60H300"/>
      <rect class="bx" x="300" y="36" width="150" height="48"/>
      ${text(375, 66, t('СТОП', 'STOP'), 't off-only', 'middle')}
      ${text(375, 66, t('ПУСК · ШВИДКІСТЬ 3', 'RUN · SPEED 3'), 't on-only', 'middle')}
      <path class="ln" d="M375 84V150"/>
      <rect class="bx" x="250" y="150" width="210" height="16"/>
      <clipPath id="ill-belt-clip"><rect x="252" y="110" width="206" height="40"/></clipPath>
      <g clip-path="url(#ill-belt-clip)"><g class="belt">${[262, 322, 382, 442].map(x => `<rect class="box" x="${x}" y="126" width="22" height="22"/>`).join('')}</g></g>
      ${gear(266, 182)}${gear(444, 182)}
      <path class="ln" d="M16 222H464"/>
      ${text(30, 246, t('ДО 50 000 ДІЙ/С · 4 кВт', 'UP TO 50,000 OPS/S · 4 kW'))}
    `);
  },

  /* Стаття 4. МИР-2: екран і світлове перо */
  mir2(t) {
    return svg(t('МИР-2: інженер малює світловим пером на екрані', 'MIR-2: an engineer draws on the screen with a light pen'), `
      <rect class="bg" width="${W}" height="${H}"/>
      <rect class="bx" x="30" y="80" width="130" height="130"/>
      ${text(95, 106, t('МИР-2', 'MIR-2'), 't', 'middle')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="lamp" x="${48 + (i % 3) * 32}" y="${122 + Math.floor(i / 3) * 22}" width="14" height="10" style="--d:${delay(i)}"/>`).join('')}
      <rect class="bx" x="44" y="176" width="102" height="20"/>
      <rect class="bx" x="200" y="34" width="220" height="150"/>
      <rect class="screen" x="214" y="48" width="192" height="122"/>
      <path class="ln faint" d="M222 110H398M232 56V164"/>
      <path class="draw" pathLength="100" d="M232 110C248 70 264 70 280 110S312 150 328 110 360 70 376 110 392 130 398 120"/>
      ${text(392, 66, 'y = sin x', 't on-only', 'end')}
      <rect class="bx" x="290" y="184" width="40" height="26"/>
      <path class="ln" d="M16 210H464"/>
      <path class="cord" d="M440 210C440 180 452 160 446 140"/>
      <g class="pen"><path class="penbody" d="M446 140L420 112"/><rect class="pentip" x="416" y="106" width="6" height="6"/></g>
      ${text(30, 240, t('ДО 12 000 ДІЙ/С · ЕКРАН І СВІТЛОВЕ ПЕРО · 1969', 'UP TO 12,000 OPS/S · SCREEN AND LIGHT PEN · 1969'))}
    `);
  },

  /* Стаття 5. Адресна мова: у комірці лежить не число, а адреса іншої комірки */
  address(t) {
    const cells = ['12', '7', '@05', '3', '42', '0']; // «@05» — «адреса 05»
    return svg(t('Адресна мова: комірка 03 зберігає адресу комірки 05, де лежить число 42', 'Address language: cell 03 stores the address of cell 05, which holds 42'), `
      <rect class="bg" width="${W}" height="${H}"/>
      ${text(240, 30, t('КОМІРКА 03 ЗБЕРІГАЄ НЕ ЧИСЛО, А АДРЕСУ', 'CELL 03 HOLDS AN ADDRESS, NOT A NUMBER'), 't', 'middle')}
      ${cells.map((v, i) => {
        const x = 30 + i * 72;
        const cls = i === 2 ? ' c3' : i === 4 ? ' c5' : '';
        return `<g class="cell${cls}"><rect class="bx" x="${x}" y="96" width="60" height="64"/>${text(x + 30, 134, v, 't big', 'middle')}${text(x + 30, 180, '0' + (i + 1), 't dim-t', 'middle')}</g>`;
      }).join('')}
      <g class="ptr"><path class="arrow" d="M196 58h16v14h10l-18 16-18-16h10z"/></g>
      <path class="hop" d="M204 166V200H348V166"/>
      <g class="result"><rect class="bx strong" x="150" y="210" width="180" height="32"/>${text(240, 231, t('РЕЗУЛЬТАТ: 42', 'RESULT: 42'), 't', 'middle')}</g>
    `);
  },

  /* Стаття 6. Перевіряємо гучний заголовок лупою */
  legend(t) {
    const checks = [t('ХТО ЦЕ КАЖЕ?', 'WHO SAYS SO?'), t('Є ДОКУМЕНТ?', 'IS THERE A RECORD?'), t('ІНШІ ДЖЕРЕЛА?', 'OTHER SOURCES?'), t('ЩО САМЕ ПЕРШЕ?', 'FIRST AT WHAT?')];
    return svg(t('Гучний заголовок «Перший у світі!» перевіряють за пам\'яткою', 'A “World’s first!” headline checked against a checklist'), `
      <rect class="bg" width="${W}" height="${H}"/>
      <rect class="bx" x="24" y="28" width="250" height="200"/>
      ${text(40, 52, t('НОВИНИ', 'NEWS'), 't dim-t')}
      <path class="ln" d="M40 60H258"/>
      ${text(40, 92, t('МЕСМ — ПЕРША', 'MESM: THE FIRST'), 't big')}
      ${text(40, 116, t('У СВІТІ!', 'IN THE WORLD!'), 't big')}
      <path class="strike" pathLength="100" d="M36 111H170"/>
      ${[140, 156, 172, 188, 204].map((y, i) => `<rect class="gray" x="40" y="${y}" width="${[200, 180, 210, 150, 190][i]}" height="6"/>`).join('')}
      <g class="stamp"><rect x="96" y="150" width="166" height="54"/>${text(179, 172, t('ПЕРША В СРСР ✓', 'FIRST IN THE USSR ✓'), 't stamp-t', 'middle')}${text(179, 192, t('ПОСТАНОВА 1952', '1952 RESOLUTION'), 't stamp-t', 'middle')}</g>
      <g class="lens"><circle class="glass" cx="210" cy="64" r="28"/><path class="handle" d="M230 84l22 22"/></g>
      ${checks.map((s, i) => `<g class="chk" style="--d:${400 + i * 500}ms"><rect class="bx" x="300" y="${44 + i * 46}" width="18" height="18"/><path class="tick" d="M303 ${53 + i * 46}l5 5 8-10"/>${text(328, 58 + i * 46, s)}</g>`).join('')}
    `);
  },

  /* ===== Обкладинки карток на головній (без слів — однаково для UA і EN) ===== */

  /* Екскурсія 1. Від ЕОМ до смартфона: техніка меншає, екрани спалахують по черзі */
  tourHistory(t) {
    let lamps = '';
    for (let i = 0; i < 18; i++) lamps += `<rect class="lamp" x="${42 + (i % 3) * 22}" y="${88 + Math.floor(i / 3) * 18}" width="10" height="8" style="--d:${delay(i)}"/>`;
    return svg(t('Від великої ЕОМ до смартфона', 'From a mainframe to a smartphone'), `
      <rect class="bg" width="${W}" height="${H}"/>
      <g class="dev" style="--d:0ms"><rect class="bx" x="30" y="70" width="90" height="150"/>${lamps}</g>
      <g class="dev" style="--d:700ms"><rect class="bx" x="150" y="118" width="84" height="62"/><rect class="scr" x="160" y="127" width="64" height="44"/><rect class="bx" x="180" y="180" width="24" height="12"/><rect class="bx" x="148" y="204" width="88" height="14"/></g>
      <g class="dev" style="--d:1400ms"><rect class="bx" x="270" y="160" width="74" height="48"/><rect class="scr" x="278" y="167" width="58" height="34"/><rect class="bx" x="260" y="208" width="94" height="12"/></g>
      <g class="dev" style="--d:2100ms"><rect class="bx" x="392" y="150" width="40" height="70"/><rect class="scr" x="398" y="158" width="28" height="50"/></g>
      <path class="ln" d="M16 222H464"/>
      <path class="ln" d="M40 244H440"/>
      ${[75, 192, 307, 412].map(x => `<rect class="tick-dot" x="${x - 4}" y="240" width="8" height="8"/>`).join('')}
      <rect class="runner" x="71" y="236" width="8" height="16"/>
    `);
  },

  /* Екскурсія 2. Ігри 80–90-х: телевізор із «тенісом» і джойстик */
  tourGames(t) {
    return svg(t('Телевізор із ретро-грою та джойстик', 'A TV with a retro game and a joystick'), `
      <rect class="bg" width="${W}" height="${H}"/>
      <rect class="bx" x="70" y="30" width="280" height="190"/>
      <rect class="screen" x="88" y="46" width="244" height="150"/>
      <path class="ln faint dash" d="M210 52V190"/>
      ${text(180, 76, '3', 't big', 'middle')}${text(240, 76, '2', 't big', 'middle')}
      <rect class="pad pad-l" x="104" y="104" width="8" height="34"/>
      <rect class="pad pad-r" x="308" y="104" width="8" height="34"/>
      <rect class="ball" x="206" y="118" width="10" height="10"/>
      <rect class="bx" x="180" y="220" width="60" height="10"/>
      <rect class="bx" x="374" y="196" width="80" height="26"/>
      <g class="stick"><path class="stick-rod" d="M414 196V150"/><rect class="knob" x="404" y="138" width="20" height="18"/></g>
      <rect class="btn-red" x="432" y="202" width="14" height="10"/>
      <path class="cord" d="M374 210C350 216 344 236 300 238"/>
    `);
  },

  /* Екскурсія 3. Група школярів біля екрана: «руки вгору» */
  tourClass(t) {
    const kids = [];
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) kids.push([70 + c * 96, 150 + r * 50, r * 4 + c]);
    return svg(t('Клас школярів на екскурсії біля екрана', 'A school class at the screen during a tour'), `
      <rect class="bg" width="${W}" height="${H}"/>
      <rect class="bx" x="150" y="20" width="180" height="96"/>
      <rect class="screen" x="162" y="30" width="156" height="74"/>
      <g class="on-only"><rect class="scr-ico" x="214" y="44" width="52" height="34"/><rect class="scr-ico" x="232" y="80" width="16" height="8"/><rect class="scr-ico" x="222" y="88" width="36" height="6"/></g>
      <rect class="bx" x="232" y="116" width="16" height="10"/>
      ${kids.map(([x, y, i]) => `<g class="kid" style="--d:${delay(i)}"><rect class="hand" x="${x + 16}" y="${y - 26}" width="6" height="14"/><rect class="head" x="${x - 9}" y="${y - 18}" width="18" height="18"/><rect class="bx" x="${x - 26}" y="${y + 4}" width="52" height="10"/></g>`).join('')}
      <path class="ln" d="M16 250H464"/>
    `);
  },

  /* Курс 1. Відеодзвінок із рідними */
  courseCall(t) {
    const face = (x, d) => `<g class="face" style="--d:${d}"><rect class="head" x="${x - 26}" y="74" width="52" height="56"/><rect class="hair" x="${x - 30}" y="66" width="60" height="14"/><rect class="eye" x="${x - 14}" y="94" width="8" height="8"/><rect class="eye" x="${x + 6}" y="94" width="8" height="8"/><rect class="eye" x="${x - 10}" y="114" width="20" height="4"/><rect class="body" x="${x - 40}" y="136" width="80" height="34"/></g>`;
    return svg(t('Відеодзвінок із рідними на ноутбуці', 'A video call with family on a laptop'), `
      <rect class="bg" width="${W}" height="${H}"/>
      <rect class="bx" x="60" y="20" width="360" height="190"/>
      <rect class="screen" x="74" y="32" width="160" height="150"/>
      <rect class="screen" x="246" y="32" width="160" height="150"/>
      ${face(154, '0ms')}${face(326, '300ms')}
      <g class="off-only"><rect class="phone-ico" x="218" y="88" width="44" height="40"/></g>
      <g class="wave"><rect class="hand" x="380" y="120" width="14" height="22"/></g>
      ${[0, 1, 2].map(i => `<rect class="ring" style="--d:${i * 200}ms" x="${222 + i * 14}" y="190" width="8" height="8"/>`).join('')}
      <rect class="bx" x="30" y="210" width="420" height="16"/>
    `);
  },

  /* Курс 2. Перша програма: рядки коду друкуються, персонаж гри стрибає */
  courseCode(t) {
    const lines = [[0, 120], [20, 150], [20, 90], [40, 130], [20, 70], [0, 40]];
    return svg(t('Редактор коду і маленька гра', 'A code editor and a small game'), `
      <rect class="bg" width="${W}" height="${H}"/>
      <rect class="bx" x="24" y="30" width="250" height="196"/>
      <rect class="bx" x="24" y="30" width="250" height="20"/>
      ${lines.map(([ind, w], i) => `<rect class="code" style="--d:${i * 350}ms" x="${44 + ind}" y="${66 + i * 24}" width="${w}" height="10"/>`).join('')}
      <rect class="caret" x="44" y="${66 + 6 * 24}" width="8" height="12"/>
      <rect class="bx" x="300" y="56" width="156" height="128"/>
      <rect class="screen" x="310" y="66" width="136" height="108"/>
      <path class="ln" d="M310 150H446"/>
      <rect class="block" x="398" y="134" width="16" height="16"/>
      <g class="hero"><rect class="hero-b" x="336" y="128" width="16" height="22"/><rect class="hero-e" x="346" y="132" width="4" height="4"/></g>
      <path class="ln" d="M274 120H300"/>
    `);
  },

  /* Курс 3. Ретро-техніка руками: відкритий системний блок, викрутка, «READY.» */
  courseRepair(t) {
    const chips = [[92, 128, 34], [138, 128, 34], [92, 160, 80], [184, 128, 22]];
    return svg(t('Відкритий старий комп’ютер, викрутка і екран', 'An opened old computer, a screwdriver and a screen'), `
      <rect class="bg" width="${W}" height="${H}"/>
      <rect class="bx" x="70" y="110" width="200" height="110"/>
      <rect class="board" x="82" y="120" width="176" height="90"/>
      ${chips.map(([x, y, w]) => `<rect class="chip" x="${x}" y="${y}" width="${w}" height="18"/>`).join('')}
      <rect class="led" x="236" y="196" width="10" height="6"/>
      <g class="lid"><rect class="bx" x="70" y="96" width="200" height="14"/></g>
      ${[[110, 70], [214, 58], [250, 84]].map(([x, y], i) => `<path class="spark" style="--d:${i * 300}ms" d="M${x} ${y - 8}V${y + 8}M${x - 8} ${y}H${x + 8}"/>`).join('')}
      <g class="driver"><rect class="drv-h" x="300" y="170" width="18" height="44"/><rect class="drv-s" x="306" y="140" width="6" height="30"/></g>
      <rect class="bx" x="330" y="40" width="130" height="100"/>
      <rect class="screen" x="342" y="50" width="106" height="72"/>
      ${text(352, 76, 'READY.', 't on-only')}
      <rect class="caret on-only" x="352" y="84" width="8" height="12"/>
      <rect class="bx" x="380" y="140" width="30" height="10"/>
      <path class="ln" d="M16 222H464"/>
    `);
  },
};
