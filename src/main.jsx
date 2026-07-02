import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  BookOpen,
  Feather,
  HeartHandshake,
  Mail,
  MessageCircle,
  Moon,
  Send,
  Waves,
} from 'lucide-react';
import './styles.css';
import brandLogo from './assets/brand-logo.png';

const issues = [
  {
    number: 'Issue 01',
    title: '夜に届く返事',
    theme: '眠れない夜、想い、そして自分をそっと置くこと',
    note: '18名の読者による夜の独白を収録。やわらかな写真、短い詩、インタビューで編んだ、何度も読み返せる一冊。',
  },
  {
    number: 'Issue 02',
    title: '心をゆっくりほどく',
    theme: '立ち止まること、整えること、もう一度呼吸すること',
    note: '街を歩く時間、ひとりで過ごす練習、心理カウンセラーへの質問を通して、忙しさの中に静けさを残す方法を考えます。',
  },
  {
    number: 'Issue 03',
    title: '潮の内側',
    theme: '感情の揺れと、関係の境界線について',
    note: '海辺の手記を手がかりに、親密な関係の中にある近づくこと、離れること、理解すること、やさしく断ることを見つめます。',
  },
];

const advantages = [
  {
    icon: <Moon size={28} />,
    title: '感情の物語',
    text: '文学、写真、読者からの手紙を通して、名づけにくい感情を記録し、読む人が言葉の中で理解される場所をつくります。',
  },
  {
    icon: <Feather size={28} />,
    title: '軽やかな美学',
    text: '余白を生かしたレイアウト、淡い色彩、静かなビジュアルで、紙に触れるような穏やかな読書体験を届けます。',
  },
  {
    icon: <HeartHandshake size={28} />,
    title: '読者と育つ企画',
    text: '毎号、読者の問いからテーマを広げ、投稿、Q&A、編集部からの返信を継続的に育つコンテンツにしていきます。',
  },
];

function App() {
  return (
    <main>
      <nav className="nav">
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
          <div className="sunDisc" />
          <div className="paper paperOne" />
          <div className="paper paperTwo" />
        </div>
        <div className="container heroInner">
          <p className="eyebrow">A quiet magazine for tender emotions</p>
          <h1 className="heroLogoTitle">
            <img src={brandLogo} alt="" />
            <span className="srOnly">ZETSU/UJI</span>
          </h1>
          <p className="heroText">
            感情に寄り添う雑誌。日々の中でそっと折りたたまれた心の声を集め、言葉、写真、読者からの手紙を通して、不確かな気持ちを留めておけるページへと整えます。
          </p>
          <a className="scrollCue" href="#philosophy" aria-label="ブランド理念へ">
            <ArrowDown size={20} />
          </a>
        </div>
      </section>

      <section id="philosophy" className="section philosophy">
        <div className="container split">
          <div>
            <p className="eyebrow">Brand Philosophy</p>
            <h2>感情が見つめられ、やさしく手放される場所へ。</h2>
          </div>
          <div className="copyBlock">
            <p>
              ZETSU/UJI は、現代を生きる人の繊細な感情に目を向けます。喪失感、疲れ、恋しさ、ためらい、そしてもう一度明るさを感じる瞬間。急いで答えを出すのではなく、自分をゆっくり読み解くための時間を届けます。
            </p>
            <p>
              企画の目的は、読者のリアルな問いを起点にしたコンテンツの場をつくること。毎号が丁寧に編集された返信のように、関係、成長、孤独、セルフケアの間で、自分らしいリズムを見つける手助けをします。
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="section products">
        <div className="container">
          <div className="sectionHead">
            <p className="eyebrow">Selected Issues</p>
            <h2>特集号</h2>
          </div>
          <div className="issueGrid">
            {issues.map((issue) => (
              <article className="issueCard" key={issue.number}>
                <div className="issueCover">
                  <BookOpen size={34} />
                  <span>{issue.number}</span>
                </div>
                <div className="issueContent">
                  <p>{issue.theme}</p>
                  <h3>{issue.title}</h3>
                  <span>{issue.note}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="advantages" className="section advantages">
        <div className="container">
          <div className="sectionHead centered">
            <p className="eyebrow">What Makes Us Different</p>
            <h2>ブランドだけの魅力</h2>
          </div>
          <div className="advantageGrid">
            {advantages.map((item) => (
              <article className="advantageCard" key={item.title}>
                <div className="iconBadge">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="submit" className="section submit">
        <div className="container submitShell">
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

      <footer id="contact" className="contact">
        <div className="container contactInner">
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
