
export const introText = `
# Jbook
This is and interactive coding environment. You can write Javascript, import any NPM modules and see it executed, and write comprehensive documentation using markdown.

- Click any text cell (including this one) to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell#1, you can refer it to any following cells!
- You can show any React component, string, number or anything else by calling \`show\` function. This is a function built into this environment. Call show multiple times to show multiple values.
- Re-order or delete cells using the buttons on the top right
- Add new cells by hovering on the divider between cells
All of your changes get saved to the file you opened Jbook with. So if your run \`npx jbook-by-jl serve test.js\`, all of the text and code you write will be saved to the \`test.js\` that located in the same directory where you run command.
`.trim();

export const sampleCode = `
import { useState } from 'react';
const Counter = () => {
	const [count, setCount] = useState(0);
	return (
		<div>
			<button onClick={() => setCount(count+1)}>Click</button>
			<h3>Count: {count}</h3>
		</div>
	);
};

// display any variable or React Component by calling \`show\`
show(<Counter />);
`.trim();