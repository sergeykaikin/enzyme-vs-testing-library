import React from 'react';

const Demo = () => {
  const [greeting, setGreeting] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [isGifVisible, setGifVisible] = React.useState(false);

  const increaseCountByOne = React.useCallback(() => setCount(count + 1));
  const toggleGifVisibility = React.useCallback(() => setGifVisible(!isGifVisible));

  React.useEffect(() => {
      setGreeting('Hello World');
  }, []);
  React.useEffect(() => {
      if (count >= 10 && count % 10 === 0) {
          toggleGifVisibility();
      }
  }, [count]);

  return (
      <div>
          <span>{greeting}!</span>
          <div>
              I can:
              <ul>
                  <li>
                      <button onClick={increaseCountByOne}>Update count</button>
                      <div>Current count: {count}</div>
                  </li>
                  <li>
                      <button onClick={toggleGifVisibility}>Toggle visibility</button>
                      {
                          isGifVisible ? <img src="https://i.giphy.com/Hhg7EGRgn9VJ5RLdou.gif" alt="tada" height={100} /> : null
                      }
                  </li>
              </ul>
          </div>
      </div>
  );
}

export default Demo;
