import PropTypes from "prop-types";
import "./SkillLabel.css";

export function SkillLabel({ text })  {
    return(
        <span className="skill-label">{text}</span>
    );
}

SkillLabel.propTypes = {
    text: PropTypes.string.isRequired,
};