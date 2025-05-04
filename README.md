# Veact

A lightweight, experimental implementation of a React-like library. Veact (Virtual DOM + React) is a mini-version of React designed for learning purposes and experimentation.

## 🚧 Status

**Under Development**: This project is still in the early stages and is being actively developed.

## 🌟 Features

- Custom JSX-like syntax (`.vsx` files)
- Virtual DOM implementation
- Component-based architecture
- Simple rendering engine
- Built-in compiler and parser

## 📋 Prerequisites

- [Bun](https://bun.sh/) - Fast JavaScript runtime & package manager

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/veact.git
cd veact

# Install dependencies
bun install
```

### Running the Development Server

```bash
bun run index.ts
```

This starts a development server at `http://localhost:3000`.

## 📝 Usage

Create components using the `.vsx` format:

```
Component {
    (
        [div]
            [h1 style="color: red;"]
                Hello from Veact!
            [/h1]
        [/div]
    )
}
```

## 🛠️ Project Structure

- `/veact` - Core implementation
  - `/compiler` - VSX to HTML compiler
  - `/parser` - VSX syntax parser
  - `/visitor` - AST visitor implementations
  - `/types` - TypeScript type definitions
- `/pages` - Example components
- `/tests` - Test suite

## 📚 Learning Resources

This project is inspired by React's architecture and is recommended for those who want to understand:
- How virtual DOM works
- Component rendering and reconciliation
- JSX compilation
- Basic parser/compiler implementation

## 📄 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!