import styles from './GameInfos.module.css';
import apiclient, { type Character } from '@waldogame/apiclient';
import { PulseLoader } from '@waldogame/ui';
import { useQuery } from '@tanstack/react-query';

function GameInfos() {
  const {
    data: characters,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['characters'],
    queryFn: apiclient.getAllCharacters,
    staleTime: Infinity,
  });

  return (
    <div className={styles['game-infos']} data-testid="game-infos">
      <div>
        {isLoading && (
          <div className={styles.loading} data-testid="loading">
            <PulseLoader color="#bf225a" />
          </div>
        )}
        {error && <p className={styles.error}>{error.message}</p>}
        {characters && (
          <>
            <GamePresent />
            <GameRules />
            <CharacterPresent characters={characters} />
          </>
        )}
      </div>
    </div>
  );
}

function GamePresent() {
  return (
    <div>
      <h1>🎲Game presentation</h1>
      <p>
        <span>Where Is Waldo?</span> is a fast-paced hidden-object game where
        your goal is to locate a set of characters cleverly hidden inside highly
        detailed illustrations. Each level features unique artwork filled with
        distractions, visual tricks, and hundreds of tiny elements designed to
        challenge your concentration. The faster you find all characters, the
        higher your score on the leaderboard. Sharpen your eyes, trust your
        instincts, and race against the clock to become the ultimate Waldo
        spotter!
      </p>
    </div>
  );
}

function GameRules() {
  return (
    <div className={styles.rules}>
      <h1>📜Game rules</h1>
      <div>
        <h2>1. Choose a Level</h2>
        <p>
          Select any board you want to play. Each board contains a different set
          of characters to find.
        </p>
      </div>
      <div>
        <h2>2. Start the Round</h2>
        <p>As soon as the board loads, the timer begins. Stay focused!</p>
      </div>
      <div>
        <h2>3. Find the Characters</h2>
        <p>
          Click on the character you found to open the targeting menu, then
          select the character you think you've found.
        </p>
      </div>
      <div>
        <h2>4. Confirm Your Guess</h2>
        <p>The game checks your selection.</p>
        <ul>
          <li> If you're correct, the character is marked as found.</li>
          <li> If you're wrong, keep searching!</li>
        </ul>
      </div>
      <div>
        <h2>5. Complete the Board</h2>
        <p> Once you find all characters, your time is recorded.</p>
      </div>
      <div>
        <h2>6. Enter Your Name</h2>
        <p>
          After finishing the round, submit your name to save your score on the
          leaderboard for that board.
        </p>
      </div>
    </div>
  );
}

function CharacterPresent({ characters }: { characters: Character[] }) {
  const charList = characters.map((char, index) => {
    return (
      <div key={char.id} className={styles['character-card']}>
        <h2>
          <a
            href="https://waldo.fandom.com/wiki/Category:Characters"
            target="_blank"
          >
            {`${index + 1}. ${char.name}`}
          </a>
        </h2>
        <p className={styles.description}>
          <img src={char.imageUrl} alt={char.name} />
          {char.description}
        </p>
      </div>
    );
  });

  return (
    <div className={styles.characters}>
      <h1>🔎Characters to find</h1>
      {charList}
    </div>
  );
}

export default GameInfos;
