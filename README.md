# Pathfinding Algorithm Visualization Tool

A web-based visualization tool for exploring popular pathfinding algorithms. This project provides an interactive way to learn about and understand various algorithms used for finding the shortest path in grid-based systems.

## Table of Contents
- [Features](#features)
- [Demo Video](#demo-video)
- [Algorithms Supported](#algorithms-supported)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Interactive Interface**: Visualize pathfinding algorithms on a customizable grid.
- **Multiple Algorithms**: Compare different pathfinding algorithms.
- **Adjustable Costs**: Set directional movement costs to see how they affect pathfinding.
- **Animation Speeds**: Choose from slow, medium, or fast speeds for visualization.
- **Responsive Design**: Works across various screen sizes for an optimal experience.

## Demo Video
![Demo](https://github.com/user-attachments/assets/049421ee-c06c-47c7-8da2-40eed6384e9d)


## Algorithms Supported
- **Depth-First Search (DFS)**
- **Breadth-First Search (BFS)**
- **Dijkstra's Algorithm**
- <b>A* Search (Euclidean Distance)</b>
- <b>A* Search (Manhattan Distance)</b>

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/pathfinding-visualization-tool.git
cd pathfinding-visualization-tool
```

### 2. Install TypeScript
Make sure you have TypeScript installed globally. If not, you can install it using npm:

```
npm install -g typescript
```

### 3. Compile TypeScript Files
To compile the TypeScript files from src to JavaScript files in the dist folder, run:

```
tsc
```

This will use the tsconfig.json file to compile all TypeScript files in src and output them to dist.

Usage
Running Locally
Since this is a basic HTML/CSS/JavaScript project, you can simply open index.html in your web browser after compiling the TypeScript files.

Alternatively, you can serve the project locally using a simple HTTP server for better compatibility:

### Using Python (if installed):
```
# For Python 3.x
python -m http.server 8000
```

Then, open your browser and go to http://localhost:8000.

### Using a VSCode Live Server Extension:
If you’re using Visual Studio Code, you can use the "Live Server" extension to serve the project by right-clicking index.html and selecting "Open with Live Server."

TypeScript Compilation
The TypeScript source files are located in the src folder, and the compiled JavaScript files are output to the dist folder. Any changes made to the TypeScript files will require recompilation.

To continuously compile as you make changes, you can use the --watch flag:

```
tsc --watch
```


## File Structure
- `src/:` Contains the TypeScript source files.
- `dist/:` Contains the compiled JavaScript files.
- `style.css`: Contains the styling for the visualization.
- `index.html`: Main HTML file that hosts the application.
Contributing
Contributions are welcome! To contribute:


## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to your branch and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.