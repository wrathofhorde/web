import PropTyes from "prop-types";

function Button({ text }) {
  return <button>{text}</button>;
}

Button.PropTyes = {
  text: PropTyes.string.isRequired,
};

export default Button;
