import React, { PropTypes, PureComponent } from "react";
import { RectClipped } from "./Clipped";
import GameShape, { HOME, VISITOR } from "./GameShape";
import controllable from "react-controllables";
import moment from "moment";
import _ from "underscore";

class BracketGame extends PureComponent {
  static propTypes = {
    game: GameShape.isRequired,

    homeOnTop: PropTypes.bool,

    hoveredTeamId: PropTypes.string,
    onHoveredTeamIdChange: PropTypes.func.isRequired,
    onSideClick: PropTypes.func.isRequired,

    styles: PropTypes.shape(
      {
        backgroundColor: PropTypes.string.isRequired,
        hoverBackgroundColor: PropTypes.string.isRequired,
        selectedColor: PropTypes.string.isRequired,
        scoreBackground: PropTypes.string.isRequired,
        winningScoreBackground: PropTypes.string.isRequired,
        teamNameStyle: PropTypes.object.isRequired,
        teamScoreStyle: PropTypes.object.isRequired,
        gameNameStyle: PropTypes.object.isRequired,
        teamSeparatorStyle: PropTypes.object.isRequired,
        selectedTeamNameStyle: PropTypes.object.isRequired
      }
    ),

    topText: PropTypes.func,
    bottomText: PropTypes.func,
  };

  static defaultProps = {
    homeOnTop: true,
    hoveredTeamId: null,

    styles: {
      backgroundColor: '#58595e',
      hoverBackgroundColor: '#222', // this is being ignored below
      selectedColor: '#ffcc00',

      scoreBackground: '#787a80',
      winningScoreBackground: '#ff7324',
      teamNameStyle: { fill: '#fff', fontSize: 12, textShadow: '1px 1px 1px #222' },
      selectedTeamNameStyle: { fill: '#000', fontSize: 12 },
      teamScoreStyle: { fill: '#23252d', fontSize: 12 },
      gameNameStyle: { fill: '#999', fontSize: 10 },
      gameTimeStyle: { fill: '#999', fontSize: 10 },
      teamSeparatorStyle: { stroke: '#444549', strokeWidth: 1 }
    },

    topText: ({ scheduled }) => moment(scheduled).format('l LT'),
    bottomText: ({ name, bracketLabel }) => _.compact([ name, bracketLabel ]).join(' - '),
  };

  render() {
    const {
      game,

      hoveredTeamId,
      onHoveredTeamIdChange,
      onSideClick,

      styles: {
        backgroundColor,
        hoverBackgroundColor,
        selectedColor,
        scoreBackground,
        winningScoreBackground,
        teamNameStyle,
        teamScoreStyle,
        gameNameStyle,
        gameTimeStyle,
        teamSeparatorStyle,
        selectedTeamNameStyle
      },

      homeOnTop,

      topText, bottomText,

      ...rest
    } = this.props;

    const { sides, selected } = game;

    const top = sides[ homeOnTop ? HOME : VISITOR ],
      bottom = sides[ homeOnTop ? VISITOR : HOME ];

    const winnerBackground = (top && bottom && top.score && bottom.score && top.score.score !== bottom.score.score) ?
      (
        top.score.score > bottom.score.score ?
          <rect x="170" y="12" width="30" height="22.5" style={{ fill: winningScoreBackground }} rx="3" ry="3"/> :
          <rect x="170" y="34.5" width="30" height="22.5" style={{ fill: winningScoreBackground }} rx="3" ry="3"/>
      ) :
      null;

    const Side = ({ x, y, side, onHover, onClick, selected }) => {
      const tooltip = side.seed && side.team ? <title>{side.seed.displayName}</title> : null;
      const sideStyle = selected ? selectedTeamNameStyle : teamNameStyle;

      return (
        <g onClick={() => onClick(side)} onMouseEnter={() => onHover(side && side.team ? side.team.id : null)} onMouseLeave={() => onHover(null)}>
          {/* trigger mouse events on the entire block */}
          <rect x={x} y={y} height={22.5} width={200} fillOpacity={0}>
            {tooltip}
          </rect>

          <RectClipped x={x} y={y} height={22.5} width={165}>
            <text x={x + 5} y={y + 16}
                  style={{ ...sideStyle, fontStyle: side.seed && side.seed.sourcePool ? 'italic' : null }}>
              {tooltip}
              {side.team ? side.team.name : (side.seed ? side.seed.displayName : null)}
            </text>
          </RectClipped>

          <text x={x + 185} y={y + 16} style={teamScoreStyle} textAnchor="middle">
            {side.score ? side.score.score : null}
          </text>
        </g>
      );
    };

    const topHovered = false, //(top && top.team && top.team.id === hoveredTeamId),
      bottomHovered = false ; //(bottom && bottom.team && bottom.team.id === hoveredTeamId);

    return (
      <svg className="bracketGame" width="200" height="82" viewBox="0 0 200 82" {...rest}>
        {/* backgrounds */}

        {/* base background */}
        <rect x="0" y="12" width="200" height="45" fill={selected ? selectedColor : backgroundColor} rx="3" ry="3"/>

        {/* background for the top team */}
        <rect x="0" y="12" width="200" height="22.5" fill={topHovered ? hoverBackgroundColor : (selected ? selectedColor : backgroundColor)} rx="3"
              ry="3"/>
        {/* background for the bottom team */}
        <rect x="0" y="34.5" width="200" height="22.5" fill={bottomHovered ? hoverBackgroundColor : (selected ? selectedColor : backgroundColor)}
              rx="3" ry="3"/>

        {/* scores background */}
        <rect x="170" y="12" width="30" height="45" fill={scoreBackground} rx="3" ry="3"/>

        {/* winner background */}
        { winnerBackground }

        {/* the players */}
        {
          top ? (
            <Side x={0} y={12} side={top} onHover={onHoveredTeamIdChange} onClick={onSideClick} selected={selected}/>
          ) : null
        }

        {
          bottom ? (
            <Side x={0} y={34.5} side={bottom} onHover={onHoveredTeamIdChange} onClick={onSideClick} selected={selected}/>
          ) : null
        }

        <line x1="0" y1="34.5" x2="200" y2="34.5" style={teamSeparatorStyle}/>

        {/* game name */}
        <text x="100" y="68" textAnchor="middle" style={gameNameStyle}>
          { bottomText(game) }
        </text>
      </svg>
    );
  }
}

export default controllable(BracketGame, [ 'hoveredTeamId' ]);