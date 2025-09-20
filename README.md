# 🎲 Tenzies Game (React)

A simple implementation of the **Tenzies dice game** built with React.  
The goal of the game is to roll until all dice show the same number. Players can "hold" dice to keep their values between rolls until they achieve victory.


## 🚀 Features
- 🎲 Roll 10 dice at once
- ✋ Click dice to hold/unhold them
- 🏆 Win condition: all dice held and showing the same value
- 🎉 Confetti animation when you win
- 🔄 "Roll" button changes to "New Game" after victory


## 🛠️ Technologies Used
- **React** (functional components + hooks)
- **nanoid** for unique dice IDs
- **canvas-confetti** for win animations
- **CSS** for styling

---

## ⚡ Challenges I Faced
1. **Confetti rendering issue**  
   - At first, I tried to render `<Confetti />` directly in JSX, but `canvas-confetti` is not a React component. This caused rendering and state issues.

2. **Final die not updating / Roll button stuck**  
   - When confetti or focus logic was added, the last die would not update correctly, and the "Roll" button wouldn't switch to "New Game".

3. **Focus error (`Cannot read properties of null (reading 'focus')`)**  
   - When trying to focus the button after winning, `buttonRef.current` was still `null`, leading to runtime errors.

---

## ✅ Solutions
- Instead of rendering `<Confetti />`, I imported it properly:
  ```js
  import confetti from "canvas-confetti"
````

and then triggered it inside a `useEffect`:

```js
useEffect(() => {
  if (gameWon) {
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } })
  }
}, [gameWon])
```

* Fixed the button focus bug by using:

  ```js
  buttonRef.current?.focus()
  ```

  (with optional chaining), and sometimes delaying with `setTimeout` to avoid null references.

* Cleaned up state management so that dice update correctly and the "Roll" button toggles to "New Game" only after a win.



## 🎯 How to Play

1. Click **Roll** to generate random dice values.
2. Click on dice to **hold** them at their current value.
3. Continue rolling until **all dice are held and have the same value**.
4. 🎉 Win the game, celebrate with confetti, then click **New Game** to restart.



## 💡 Future Improvements

* Add a timer to track how long it takes to win.
* Track number of rolls.
* Save best score in `localStorage`.
* Add difficulty levels (more/less dice).

---

## 👨‍💻 Author

Built with ❤️ and React by John Olekwa
