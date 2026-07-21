import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BookOpen,
  ArrowDown,
  Mail,
  MessageCircle,
  Send,
  Waves,
} from 'lucide-react';
import './styles.css';
import brandLogo from './assets/brand-logo.png';
import issue01Visual from './assets/issue-01-visual.png';
import issue02Visual from './assets/issue-02-visual.png';

const issues = [
  {
    number: 'Issue 01',
    coverImage: issue01Visual,
    title: 'オジサン編',
    theme: '「おじさん」を知れば、見え方が変わる。',
    note: '偏見ではなく理解から始める、新しい視点の体験型マガジン。さまざまな行動や考え方を知り、身近な人との関わり方を見つめ直すきっかけを届ける。',
  },
  {
    number: 'Issue 02',
    coverImage: issue02Visual,
    title: 'ルッキズム編',
    theme: '「見た目」だけで、人は決まらない。',
    note: '見た目で決めつける前に、一歩立ち止まって考える。ルッキズムの背景や影響を知り、多様な価値観に触れられる一冊。',
  },
  {
    number: 'Issue 03',
    title: '車編',
    theme: '未定',
    note: '事故にはならなくても、割り込みやあおり、無理な駐車など、日常の中で心をざわつかせる車の出来事。さまざまな事例を通して、その背景や向き合い方を考える一冊。',
  },
];

const advantages = [
  {
    title: '学ぶだけではなく、体験できる',
    text: '知るだけでは終わらない。読む、遊ぶ、考える体験を通して、「軽視」を自分ごととして捉えられるブランドです。',
  },
  {
    title: '新しい視点',
    text: '見方が変われば、世界も変わる。固定観念にとらわれず、多様な価値観と向き合う新しい視点を提案します。',
  },
  {
    title: 'コミュニケーション',
    text: '理解は、対話から生まれる。一人ではなく、人とつながることで新しい気づきや共感を育てることを大切にしています。',
  },
];

function App() {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const updateNavVisibility = () => {
      setNavVisible(window.scrollY > window.innerHeight * 0.62);
    };

    updateNavVisibility();
    window.addEventListener('scroll', updateNavVisibility, { passive: true });
    window.addEventListener('resize', updateNavVisibility);

    return () => {
      window.removeEventListener('scroll', updateNavVisibility);
      window.removeEventListener('resize', updateNavVisibility);
    };
  }, []);

  useEffect(() => {
    const stage = document.querySelector('.heroBackdrop');
    const shapes = Array.from(document.querySelectorAll('.floatingShape'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!stage || !shapes.length || reducedMotion.matches) return undefined;

    const stageRect = stage.getBoundingClientRect();
    const states = shapes.map((shape, index) => {
      const rect = shape.getBoundingClientRect();
      const speed = 34 + Math.random() * 24;
      const angle = Math.random() * Math.PI * 2;

      shape.style.left = `${rect.left - stageRect.left}px`;
      shape.style.top = `${rect.top - stageRect.top}px`;
      shape.style.right = 'auto';
      shape.style.bottom = 'auto';

      return {
        shape,
        x: rect.left - stageRect.left,
        y: rect.top - stageRect.top,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: Number(shape.dataset.rotation || index * 4),
      };
    });

    let frameId;
    let previousTime = performance.now();

    const animate = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.04);
      previousTime = time;
      const width = stage.clientWidth;
      const height = stage.clientHeight;

      states.forEach((state) => {
        const maxX = Math.max(0, width - state.shape.offsetWidth);
        const maxY = Math.max(0, height - state.shape.offsetHeight);
        state.x += state.vx * delta;
        state.y += state.vy * delta;

        if (state.x <= 0 || state.x >= maxX) {
          state.x = Math.min(maxX, Math.max(0, state.x));
          state.vx *= -1;
        }
        if (state.y <= 0 || state.y >= maxY) {
          state.y = Math.min(maxY, Math.max(0, state.y));
          state.vy *= -1;
        }

        state.shape.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.rotation}deg)`;
      });

      frameId = requestAnimationFrame(animate);
    };

    shapes.forEach((shape) => {
      shape.style.left = '0';
      shape.style.top = '0';
    });
    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <main>
      <nav className={`nav ${navVisible ? 'navVisible' : ''}`}>
        <a className="brandMark" href="#home" aria-label="ZETSU/UJI ホーム">
          <img src={brandLogo} alt="舌氏" />
        </a>
        <div className="navLinks">
          <a href="#philosophy">理念</a>
          <a href="#products">雑誌</a>
          <a href="#advantages">魅力</a>
          <a href="#submit">投稿</a>
          <a href="#contact">連絡</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="heroBackdrop" aria-hidden="true">
          <div className="outlineDisc floatingShape" />
          <div className="sunDisc floatingShape" />
          <div className="paper paperOne floatingShape" data-rotation="-9" />
          <div className="paper paperTwo floatingShape" data-rotation="12" />
        </div>
        <div className="container heroInner">
          <p className="eyebrow">Established in 2026</p>
          <h1 className="heroLogoTitle">
            <img src={brandLogo} alt="" />
            <span className="srOnly">ZETSU/UJI</span>
          </h1>
          <span className="heroRomanMark">ZETSU/UJI</span>
          <p className="heroText">
            舐めるを 断ち切る
          </p>
          <a className="heroNext" href="#philosophy" aria-label="次のセクションへ">
            <ArrowDown size={30} strokeWidth={2.4} />
          </a>
        </div>
      </section>

      <section className="section philosophy">
        <div id="philosophy" className="container split">
          <div>
            <p className="eyebrow">Brand Philosophy</p>
            <h2>ストレス社会に悩む人たちに寄り添いたい</h2>
          </div>
          <div className="copyBlock">
            <p>
              割り込まれたり、ぶつかられたり、文句を言われたり…日常の中で感じる小さな<span className="textEmphasis">“舐められ”</span>を<span className="textEmphasis">我慢</span>していませんか？
            </p>
            <p>
              <span className="textEmphasis">舌／氏（ZETSU/UJI）</span>は、日常の<span className="textEmphasis">“舐められ”</span>に、<span className="textEmphasis">対応できる人</span>になるためのサポートをします。例えば、かわす・距離を取る・ユーモアで返す…などうまく<span className="textEmphasis">“反応”</span>できる自分になりたくないですか？“舐められ”にあった時に、固まってしまうのは<span className="textEmphasis">“反応”のレパートリー・瞬発力</span>がないからです。そこで、舌／氏は読者と雑誌を通したコミュニケーションを行い、それをもとに作成されたカードゲームでの<span className="textEmphasis">体験学習</span>を提案します。そして有限である人生の中で、<span className="textEmphasis">自分を大切にして過ごしてほしい</span>。そんな人たちのコミュニケーション解決の場を提供したいと思います。
            </p>
          </div>
        </div>
      </section>

      <section className="section products">
        <div id="products" className="container">
          <div className="sectionHead">
            <p className="eyebrow">Selected Issues</p>
            <h2>舌氏月刊</h2>
          </div>
          <div className="issueGrid">
            {issues.map((issue) => (
              <article className="issueCard" key={issue.number}>
                <div className={`issueCover${issue.coverImage ? ' issueCoverImage' : ''}`}>
                  {issue.coverImage ? (
                    <img src={issue.coverImage} alt={`${issue.number} visual`} />
                  ) : (
                    <>
                      <BookOpen size={34} />
                      <strong>ZETSU/UJI</strong>
                    </>
                  )}
                </div>
                <div className="issueSticker">
                  <span className="issueTag">{`月刊${issue.number.replace('Issue ', '')}`}</span>
                  <p>{issue.theme}</p>
                  <h3>{issue.title}</h3>
                </div>
                <div className="issueContent">
                  <span className="issueNote">{issue.note}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="issueContinuation">
            <span>TO BE CONTINUED</span>
            <strong>続刊予定</strong>
            <p>舌氏月刊は、これからも読者の声とともに更新されていきます。</p>
          </div>
        </div>
      </section>

      <section className="section advantages">
        <div id="advantages" className="container">
          <div className="sectionHead centered">
            <p className="eyebrow">What Makes Us Different</p>
            <h2>ブランドだけの魅力</h2>
          </div>
          <div className="advantageGrid">
            {advantages.map((item) => (
              <article className="advantageCard" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section submit">
        <div id="submit" className="container submitShell">
          <div className="submitIntro">
            <p className="eyebrow">Reader Letters</p>
            <h2>あなたの問いを、次の一冊へ。</h2>
            <p>
              最近心に残っている感情、関係、暮らしの悩みをお寄せください。編集部は届いた手紙の中からテーマを選び、今後の雑誌企画や公開返信へとつなげていきます。
            </p>
          </div>
          <form className="letterForm">
            <label>
              ニックネーム
              <input type="text" placeholder="匿名でもかまいません" />
            </label>
            <label>
              連絡先
              <input type="email" placeholder="your@email.com" />
            </label>
            <label className="wide">
              あなたの問い
              <textarea placeholder="最近、心に残っていることを書いてください..." />
            </label>
            <button type="button">
              <Send size={18} />
              手紙を送る
            </button>
          </form>
        </div>
      </section>

      <footer className="contact">
        <div id="contact" className="container contactInner">
          <p className="eyebrow">Stay With Us</p>
          <img className="contactLogo" src={brandLogo} alt="舌氏" />
          <div className="contactLinks">
            <a href="mailto:hello@zetsuuji.example">
              <Mail size={20} />
              hello@zetsuuji.example
            </a>
            <a href="#submit">
              <MessageCircle size={20} />
              読者投稿
            </a>
            <a href="#home">
              <Waves size={20} />
              ホームへ戻る
            </a>
          </div>
          <p className="closing">どんな感情にも、そっと受け止められる場所がありますように。</p>
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
