import React from 'react';

//use stateless functional component when all you are doing is rendering html to dom
const Header = (props) => {
        return (
            <header className="top">
                <h1>
                    Catch 
                    <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                    </span>
                    Day
                </h1>
                <h3 className="tagline"><span>{props.tagline}</span></h3>
            </header>
        );
}

Header.propTypes = {
    tagline: React.PropTypes.string
};

export default Header;