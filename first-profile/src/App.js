import './styles.css';

const data = {
  name: 'Felix The Cat Coder',
  intro:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsam necessitatibus ducimus ab obcaecati doloribus quae fugiat, eum velit, error molestiae illum? Inventore fuga aspernatur, praesentium minus unde eveniet laborum.',
  photo: './cat_small.jpg',
  skills: [
    {
      name: 'HTML+CSS',
      emoji: '😻',
      colour: 'aquamarine',
    },
    {
      name: 'React',
      emoji: '🐈',
      colour: 'pink',
    },
    {
      name: 'Baking',
      emoji: '🧁',
      colour: 'beige',
    },
    {
      name: 'Javascript',
      emoji: '😶‍🌫️',
      colour: 'orchid',
    },
    {
      name: 'NodeJS+Express',
      emoji: '🧠',
      colour: 'lightblue',
    },
  ],
};

export default function App() {
  return (
    <div className="card">
      <Avatar name={data.name} photo={data.photo} />
      <div className="data">
        <Intro name={data.name} intro={data.intro} />
        <SkillList skills={data.skills} />
      </div>
    </div>
  );
}

function Avatar({ name, photo }) {
  return (
    <>
      <img src={photo} alt={name} className="avatar" />
    </>
  );
}

function Intro({ name, intro }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{intro}</p>
    </div>
  );
}

function SkillList({ skills }) {
  return (
    <div className="skill-list">
      {skills.map((skill, index) => {
        return <Skill key={index} {...skill} />;
      })}
    </div>
  );
}

function Skill({ name, emoji, colour }) {
  const style = { backgroundColor: colour };
  return (
    <span style={style} className="skill">
      {name} {emoji}
    </span>
  );
}
