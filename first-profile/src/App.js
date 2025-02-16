import './styles.css';

const profileData = {
  name: 'Felix The Cat Coder',
  intro:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsam necessitatibus ducimus ab obcaecati doloribus quae fugiat, eum velit, error molestiae illum? Inventore fuga aspernatur, praesentium minus unde eveniet laborum.',
  photo: './cat_small.jpg',
  skills: [
    {
      name: 'HTML+CSS',
      level: 'advanced',
      colour: 'aquamarine',
    },
    {
      name: 'React',
      level: 'intermediate',
      colour: 'pink',
    },
    {
      name: 'Baking',
      level: 'beginner',
      colour: 'beige',
    },
    {
      name: 'Javascript',
      level: 'advanced',
      colour: 'orchid',
    },
    {
      name: 'NodeJS+Express',
      level: 'intermediate',
      colour: 'lightblue',
    },
  ],
};

export default function App() {
  return (
    <div className="card">
      <Avatar name={profileData.name} photo={profileData.photo} />
      <div className="data">
        <Intro name={profileData.name} intro={profileData.intro} />
        <SkillList skills={profileData.skills} />
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
        return <Skill key={index} skill={skill} />;
      })}
    </div>
  );
}

function Skill({ skill: { name, level, colour } }) {
  const style = { backgroundColor: colour };

  return (
    <div style={style} className="skill">
      <span>{name}</span>
      <span>
        {level === 'beginner' && '👶'}
        {level === 'intermediate' && '💪'}
        {level === 'advanced' && '🌟'}
      </span>
    </div>
  );
}
