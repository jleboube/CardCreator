import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage, Line, Group } from 'react-konva';
import useImage from '../utils/useImage';
import { getTexture } from '../utils/textureGenerator';
import '../styles/CardCanvas.css';

const CardCanvas = ({ cardData, template, stageRef, showBack = false, featuredStats = [] }) => {
  const [playerImage] = useImage(cardData.playerImage);
  const [teamLogo] = useImage(cardData.teamLogo);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [textureImages, setTextureImages] = useState({});
  const imageRef = useRef(null);

  const CARD_WIDTH = 400;
  const CARD_HEIGHT = 560;
  const IMAGE_AREA_HEIGHT = 340;

  // Load textures for layered templates
  useEffect(() => {
    if (template.layers) {
      const textureLayers = template.layers.filter(layer => layer.type === 'texture');

      textureLayers.forEach(layer => {
        // Handle file-based textures
        if (layer.textureFile) {
          const img = new Image();
          img.onload = () => {
            setTextureImages(prev => {
              if (prev[layer.textureFile]) return prev;
              return {
                ...prev,
                [layer.textureFile]: img
              };
            });
          };
          img.onerror = (err) => {
            console.error(`Failed to load texture file: ${layer.textureFile}`, err);
          };
          img.src = layer.textureFile;
        }
        // Handle generated textures
        else if (layer.texture) {
          getTexture(layer.texture, 512, 512).then(img => {
            setTextureImages(prev => {
              // Only update if texture isn't already loaded
              if (prev[layer.texture]) return prev;
              return {
                ...prev,
                [layer.texture]: img
              };
            });
          }).catch(err => {
            console.error(`Failed to load texture: ${layer.texture}`, err);
          });
        }
      });
    }
  }, [template.id, template.layers]);

  // Calculate image scaling and positioning to maintain aspect ratio
  useEffect(() => {
    if (playerImage) {
      const imageWidth = playerImage.width;
      const imageHeight = playerImage.height;
      const containerWidth = CARD_WIDTH - 60;
      const containerHeight = IMAGE_AREA_HEIGHT;

      // Scale to cover the container (not fit - we want it bigger so user can pan)
      const scaleX = containerWidth / imageWidth;
      const scaleY = containerHeight / imageHeight;
      const scale = Math.max(scaleX, scaleY) * 1.2; // 1.2x larger for panning room

      setImageScale(scale);

      // Center the image
      const scaledWidth = imageWidth * scale;
      const scaledHeight = imageHeight * scale;
      setImagePosition({
        x: (containerWidth - scaledWidth) / 2 + 30,
        y: (containerHeight - scaledHeight) / 2 + 30
      });
    }
  }, [playerImage, template.id]);

  // Render featured stats
  const renderFeaturedStats = (startY, textColor, accentColor) => {
    if (!featuredStats || featuredStats.length === 0) return null;

    const statLabels = {
      avg: 'AVG', hr: 'HR', rbi: 'RBI', games: 'G', hits: 'H', sb: 'SB',
      atBats: 'AB', doubles: '2B', triples: '3B', walks: 'BB', strikeouts: 'SO',
      obp: 'OBP', slg: 'SLG', era: 'ERA', wins: 'W', losses: 'L',
      saves: 'SV', ip: 'IP', strikeoutsP: 'K', whip: 'WHIP'
    };

    const statWidth = (CARD_WIDTH - 60) / 3;

    return featuredStats.map((statKey, index) => {
      const value = cardData.stats?.[statKey] || '';
      const label = statLabels[statKey] || statKey.toUpperCase();
      const x = 30 + (index * statWidth);

      return (
        <Group key={statKey}>
          <Text
            x={x}
            y={startY}
            width={statWidth}
            text={label}
            fontSize={11}
            fontFamily={template.fontFamily}
            fill={textColor || template.secondaryTextColor}
            align="center"
            fontStyle="bold"
          />
          <Text
            x={x}
            y={startY + 18}
            width={statWidth}
            text={value}
            fontSize={20}
            fontFamily={template.fontFamily}
            fill={accentColor || template.accentColor}
            align="center"
            fontStyle="bold"
          />
        </Group>
      );
    });
  };

  // Render draggable player image with clipping (used by all templates)
  const renderDraggablePlayerImage = (clipX, clipY, clipWidth, clipHeight) => {
    if (!playerImage) return null;

    return (
      <Group
        clipFunc={(ctx) => {
          ctx.rect(clipX, clipY, clipWidth, clipHeight);
        }}
      >
        <KonvaImage
          ref={imageRef}
          image={playerImage}
          x={imagePosition.x}
          y={imagePosition.y}
          scaleX={imageScale}
          scaleY={imageScale}
          draggable={true}
          onDragMove={(e) => {
            const node = e.target;
            const pos = node.position();

            // Constrain dragging within bounds
            const minX = clipX - (playerImage.width * imageScale - clipWidth);
            const maxX = clipX;
            const minY = clipY - (playerImage.height * imageScale - clipHeight);
            const maxY = clipY;

            node.position({
              x: Math.min(maxX, Math.max(minX, pos.x)),
              y: Math.min(maxY, Math.max(minY, pos.y))
            });
          }}
          onDragEnd={(e) => {
            setImagePosition(e.target.position());
          }}
        />
      </Group>
    );
  };

  // Render layered template (for UNC Style and textured templates)
  const renderLayeredTemplate = () => {
    if (!template.layers) {
      return renderClassicTemplate(); // Fallback
    }

    return (
      <>
        {/* Render each layer in order */}
        {template.layers.map((layer, index) => {
          switch (layer.type) {
            case 'texture':
              // Render texture background (either generated or from file)
              const textureKey = layer.textureFile || layer.texture;
              if (textureImages[textureKey]) {
                return (
                  <Rect
                    key={`texture-${index}`}
                    x={layer.x || 0}
                    y={layer.y || 0}
                    width={layer.width || CARD_WIDTH}
                    height={layer.height || CARD_HEIGHT}
                    fillPatternImage={textureImages[textureKey]}
                    fillPatternRepeat="repeat"
                    fillPatternScale={{ x: (layer.width || CARD_WIDTH) / 512, y: (layer.height || CARD_HEIGHT) / 512 }}
                    cornerRadius={10}
                  />
                );
              }
              return null;

            case 'border':
              // Render border rectangle
              return (
                <Rect
                  key={`border-${index}`}
                  x={layer.x || 0}
                  y={layer.y || 0}
                  width={layer.innerWidth || CARD_WIDTH - (layer.x * 2)}
                  height={layer.innerHeight || CARD_HEIGHT - (layer.y * 2)}
                  stroke={layer.color}
                  strokeWidth={layer.width || 2}
                  fill="transparent"
                  cornerRadius={8}
                />
              );

            case 'accent-strip':
              // Render vertical or horizontal accent strip
              return (
                <Rect
                  key={`strip-${index}`}
                  x={layer.x}
                  y={layer.y}
                  width={layer.width}
                  height={layer.height}
                  fill={layer.color}
                />
              );

            case 'team-banner':
              // Render team name banner
              return (
                <Group key={`team-banner-${index}`}>
                  <Rect
                    x={layer.x}
                    y={layer.y}
                    width={layer.width}
                    height={layer.height}
                    fill={layer.backgroundColor}
                    cornerRadius={2}
                  />
                  <Text
                    x={layer.x + 5}
                    y={layer.y + (layer.height / 2) - 8}
                    text={cardData.teamName || 'TEAM'}
                    fontSize={16}
                    fontFamily={template.fontFamily}
                    fontStyle={layer.textStyle || 'italic'}
                    fill={layer.textColor || '#000000'}
                    align="left"
                  />
                </Group>
              );

            case 'name-banner':
              // Render player name banner
              return (
                <Group key={`name-banner-${index}`}>
                  <Rect
                    x={layer.x}
                    y={layer.y}
                    width={layer.width}
                    height={layer.height}
                    fill={layer.backgroundColor}
                    cornerRadius={2}
                  />
                  <Text
                    x={layer.x + 5}
                    y={layer.y + (layer.height / 2) - 10}
                    text={cardData.playerName || 'PLAYER NAME'}
                    fontSize={18}
                    fontFamily={template.fontFamily}
                    fontStyle={layer.textStyle || 'bold'}
                    fill={layer.textColor || '#000000'}
                    align="left"
                  />
                </Group>
              );

            default:
              return null;
          }
        })}

        {/* Render player image in the center */}
        {renderDraggablePlayerImage(40, 80, CARD_WIDTH - 80, IMAGE_AREA_HEIGHT)}

        {/* Team Logo */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={CARD_WIDTH - 70}
            y={45}
            width={50}
            height={50}
          />
        )}

        {/* Featured Stats (if on front) */}
        {!showBack && featuredStats && featuredStats.length > 0 && (
          <Group>
            <Rect
              x={30}
              y={440}
              width={CARD_WIDTH - 60}
              height={70}
              fill="rgba(255, 255, 255, 0.9)"
              cornerRadius={5}
            />
            {renderFeaturedStats(447, template.textColor, template.accentColor)}
          </Group>
        )}
      </>
    );
  };

  const renderClassicTemplate = () => {
    return (
      <>
        {/* Background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fill={template.backgroundColor}
          cornerRadius={10}
        />

        {/* Border */}
        <Rect
          x={10}
          y={10}
          width={CARD_WIDTH - 20}
          height={CARD_HEIGHT - 20}
          stroke={template.borderColor}
          strokeWidth={4}
          cornerRadius={8}
        />

        {/* Player Image with clipping and dragging */}
        {renderDraggablePlayerImage(30, 30, CARD_WIDTH - 60, IMAGE_AREA_HEIGHT)}

        {/* Team Logo */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={CARD_WIDTH - 80}
            y={20}
            width={60}
            height={60}
          />
        )}

        {/* Player Name */}
        <Text
          x={20}
          y={390}
          width={CARD_WIDTH - 40}
          text={cardData.playerName}
          fontSize={32}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
          fontStyle="bold"
        />

        {/* Team Name */}
        <Text
          x={20}
          y={430}
          width={CARD_WIDTH - 40}
          text={cardData.teamName}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.secondaryTextColor}
          align="center"
        />

        {/* Stats Background */}
        <Rect
          x={30}
          y={470}
          width={CARD_WIDTH - 60}
          height={60}
          fill="rgba(255, 255, 255, 0.9)"
          cornerRadius={5}
        />

        {/* Stats */}
        <Text
          x={50}
          y={480}
          text="AVG"
          fontSize={14}
          fontFamily={template.fontFamily}
          fill="#333"
          fontStyle="bold"
        />
        <Text
          x={50}
          y={500}
          text={cardData.stats?.avg || '.000'}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill="#000"
        />

        <Text
          x={150}
          y={480}
          text="HR"
          fontSize={14}
          fontFamily={template.fontFamily}
          fill="#333"
          fontStyle="bold"
        />
        <Text
          x={150}
          y={500}
          text={cardData.stats?.hr || '0'}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill="#000"
        />

        <Text
          x={250}
          y={480}
          text="RBI"
          fontSize={14}
          fontFamily={template.fontFamily}
          fill="#333"
          fontStyle="bold"
        />
        <Text
          x={250}
          y={500}
          text={cardData.stats?.rbi || '0'}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill="#000"
        />
      </>
    );
  };

  const renderModernTemplate = () => {
    return (
      <>
        {/* Background Gradient */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: 0, y: CARD_HEIGHT }}
          fillLinearGradientColorStops={[0, template.backgroundColor, 1, '#1a1a2e']}
          cornerRadius={15}
        />

        {/* Decorative Lines */}
        <Line
          points={[0, 100, CARD_WIDTH, 100]}
          stroke={template.accentColor}
          strokeWidth={3}
        />
        <Line
          points={[0, 380, CARD_WIDTH, 380]}
          stroke={template.accentColor}
          strokeWidth={3}
        />

        {/* Player Image with clipping and dragging */}
        {renderDraggablePlayerImage(50, 110, CARD_WIDTH - 100, 260)}

        {/* Team Logo */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={20}
            y={20}
            width={70}
            height={70}
          />
        )}

        {/* Player Name with Background */}
        <Rect
          x={20}
          y={400}
          width={CARD_WIDTH - 40}
          height={50}
          fill={template.accentColor}
          cornerRadius={8}
        />
        <Text
          x={20}
          y={412}
          width={CARD_WIDTH - 40}
          text={cardData.playerName}
          fontSize={28}
          fontFamily={template.fontFamily}
          fill="#fff"
          align="center"
          fontStyle="bold"
        />

        {/* Team Name */}
        <Text
          x={20}
          y={460}
          width={CARD_WIDTH - 40}
          text={cardData.teamName}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
        />

        {/* Stats Grid */}
        <Rect
          x={30}
          y={490}
          width={CARD_WIDTH - 60}
          height={50}
          fill="rgba(255, 255, 255, 0.1)"
          cornerRadius={8}
        />

        <Text
          x={60}
          y={500}
          text={`AVG: ${cardData.stats?.avg || '.000'}`}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.textColor}
        />
        <Text
          x={180}
          y={500}
          text={`HR: ${cardData.stats?.hr || '0'}`}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.textColor}
        />
        <Text
          x={280}
          y={500}
          text={`RBI: ${cardData.stats?.rbi || '0'}`}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.textColor}
        />
      </>
    );
  };

  const renderVintageTemplate = () => {
    return (
      <>
        {/* Aged Background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fill={template.backgroundColor}
          cornerRadius={5}
        />

        {/* Multiple Borders for Vintage Effect */}
        <Rect
          x={8}
          y={8}
          width={CARD_WIDTH - 16}
          height={CARD_HEIGHT - 16}
          stroke="#8B4513"
          strokeWidth={2}
        />
        <Rect
          x={15}
          y={15}
          width={CARD_WIDTH - 30}
          height={CARD_HEIGHT - 30}
          stroke={template.borderColor}
          strokeWidth={3}
        />

        {/* Player Image with Vintage Frame */}
        <Rect
          x={35}
          y={35}
          width={CARD_WIDTH - 70}
          height={320}
          fill="#fff"
        />
        {renderDraggablePlayerImage(40, 40, CARD_WIDTH - 80, 310)}

        {/* Decorative Banner for Name */}
        <Rect
          x={30}
          y={370}
          width={CARD_WIDTH - 60}
          height={60}
          fill={template.accentColor}
        />
        <Rect
          x={30}
          y={370}
          width={CARD_WIDTH - 60}
          height={60}
          stroke="#8B4513"
          strokeWidth={2}
        />

        {/* Player Name */}
        <Text
          x={40}
          y={385}
          width={CARD_WIDTH - 80}
          text={cardData.playerName.toUpperCase()}
          fontSize={26}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
          fontStyle="bold"
          letterSpacing={2}
        />

        {/* Team Name */}
        <Text
          x={30}
          y={445}
          width={CARD_WIDTH - 60}
          text={cardData.teamName.toUpperCase()}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill="#5d4037"
          align="center"
          letterSpacing={1}
        />

        {/* Stats Section */}
        <Rect
          x={40}
          y={480}
          width={CARD_WIDTH - 80}
          height={50}
          fill="rgba(139, 69, 19, 0.1)"
          stroke="#8B4513"
          strokeWidth={1}
        />

        <Text
          x={70}
          y={492}
          text="BATTING AVG"
          fontSize={10}
          fontFamily={template.fontFamily}
          fill="#5d4037"
        />
        <Text
          x={70}
          y={507}
          text={cardData.stats?.avg || '.000'}
          fontSize={14}
          fontFamily={template.fontFamily}
          fill="#000"
          fontStyle="bold"
        />

        <Text
          x={180}
          y={492}
          text="HOME RUNS"
          fontSize={10}
          fontFamily={template.fontFamily}
          fill="#5d4037"
        />
        <Text
          x={205}
          y={507}
          text={cardData.stats?.hr || '0'}
          fontSize={14}
          fontFamily={template.fontFamily}
          fill="#000"
          fontStyle="bold"
        />

        <Text
          x={280}
          y={492}
          text="RBI"
          fontSize={10}
          fontFamily={template.fontFamily}
          fill="#5d4037"
        />
        <Text
          x={290}
          y={507}
          text={cardData.stats?.rbi || '0'}
          fontSize={14}
          fontFamily={template.fontFamily}
          fill="#000"
          fontStyle="bold"
        />
      </>
    );
  };

  const renderMinimalistTemplate = () => {
    return (
      <>
        {/* Clean Background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fill={template.backgroundColor}
        />

        {/* Simple Top Border */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={5}
          fill={template.accentColor}
        />

        {/* Player Image - Full Bleed with dragging */}
        {renderDraggablePlayerImage(0, 5, CARD_WIDTH, 360)}

        {/* Team Logo - Small and Subtle */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={CARD_WIDTH - 60}
            y={15}
            width={50}
            height={50}
            opacity={0.8}
          />
        )}

        {/* Player Name */}
        <Text
          x={30}
          y={385}
          width={CARD_WIDTH - 60}
          text={cardData.playerName}
          fontSize={36}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="300"
        />

        {/* Team Name */}
        <Text
          x={30}
          y={430}
          width={CARD_WIDTH - 60}
          text={cardData.teamName}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill={template.secondaryTextColor}
        />

        {/* Minimal Stats Line */}
        <Line
          points={[30, 475, CARD_WIDTH - 30, 475]}
          stroke={template.accentColor}
          strokeWidth={1}
        />

        <Text
          x={30}
          y={490}
          text={`${cardData.stats?.avg || '.000'}`}
          fontSize={24}
          fontFamily={template.fontFamily}
          fill={template.textColor}
        />
        <Text
          x={150}
          y={490}
          text={`${cardData.stats?.hr || '0'} HR`}
          fontSize={24}
          fontFamily={template.fontFamily}
          fill={template.textColor}
        />
        <Text
          x={270}
          y={490}
          text={`${cardData.stats?.rbi || '0'} RBI`}
          fontSize={24}
          fontFamily={template.fontFamily}
          fill={template.textColor}
        />
      </>
    );
  };

  const renderRetro80sTemplate = () => {
    return (
      <>
        {/* Retro gradient background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: CARD_WIDTH, y: CARD_HEIGHT }}
          fillLinearGradientColorStops={[0, '#FF6B9D', 0.5, '#FDB44B', 1, '#4ECDC4']}
          cornerRadius={15}
        />

        {/* Geometric pattern borders */}
        <Line
          points={[0, 80, CARD_WIDTH, 80]}
          stroke={template.borderColor}
          strokeWidth={8}
        />
        <Line
          points={[0, 88, CARD_WIDTH, 88]}
          stroke={template.secondaryAccent}
          strokeWidth={4}
        />

        {/* Player Image */}
        {renderDraggablePlayerImage(30, 100, CARD_WIDTH - 60, 280)}

        {/* Team Logo */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={CARD_WIDTH - 80}
            y={15}
            width={65}
            height={65}
          />
        )}

        {/* Player Name with 80s style */}
        <Rect
          x={20}
          y={395}
          width={CARD_WIDTH - 40}
          height={50}
          fill={template.accentColor}
          cornerRadius={5}
          strokeWidth={4}
          stroke={template.borderColor}
        />
        <Text
          x={20}
          y={407}
          width={CARD_WIDTH - 40}
          text={cardData.playerName.toUpperCase()}
          fontSize={28}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
          fontStyle="bold"
          shadowColor="#000"
          shadowBlur={3}
        />

        {/* Team Name */}
        <Text
          x={20}
          y={455}
          width={CARD_WIDTH - 40}
          text={cardData.teamName.toUpperCase()}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
          fontStyle="bold"
        />

        {/* Stats */}
        <Line
          points={[20, 490, CARD_WIDTH - 20, 490]}
          stroke={template.secondaryTextColor}
          strokeWidth={3}
        />
        <Text
          x={50}
          y={500}
          text={`AVG ${cardData.stats?.avg || '.000'}`}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
        <Text
          x={170}
          y={500}
          text={`HR ${cardData.stats?.hr || '0'}`}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
        <Text
          x={270}
          y={500}
          text={`RBI ${cardData.stats?.rbi || '0'}`}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
      </>
    );
  };

  const renderChromeTemplate = () => {
    return (
      <>
        {/* Chrome gradient background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: 0, y: CARD_HEIGHT }}
          fillLinearGradientColorStops={[0, '#F5F5F5', 0.3, '#C0C0C0', 0.7, '#808080', 1, '#696969']}
          cornerRadius={12}
        />

        {/* Metallic borders */}
        <Rect
          x={12}
          y={12}
          width={CARD_WIDTH - 24}
          height={CARD_HEIGHT - 24}
          stroke="#404040"
          strokeWidth={6}
          cornerRadius={8}
        />
        <Rect
          x={20}
          y={20}
          width={CARD_WIDTH - 40}
          height={CARD_HEIGHT - 40}
          stroke="#D3D3D3"
          strokeWidth={2}
          cornerRadius={6}
        />

        {/* Player Image */}
        {renderDraggablePlayerImage(40, 40, CARD_WIDTH - 80, 300)}

        {/* Team Logo */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={CARD_WIDTH - 85}
            y={25}
            width={60}
            height={60}
          />
        )}

        {/* Player Name with metallic effect */}
        <Rect
          x={30}
          y={360}
          width={CARD_WIDTH - 60}
          height={45}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: 0, y: 45 }}
          fillLinearGradientColorStops={[0, '#A8A8A8', 0.5, '#696969', 1, '#505050']}
          cornerRadius={8}
          stroke="#2C2C2C"
          strokeWidth={3}
        />
        <Text
          x={30}
          y={372}
          width={CARD_WIDTH - 60}
          text={cardData.playerName.toUpperCase()}
          fontSize={26}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
          fontStyle="bold"
        />

        {/* Team Name */}
        <Text
          x={30}
          y={415}
          width={CARD_WIDTH - 60}
          text={cardData.teamName.toUpperCase()}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
        />

        {/* Stats */}
        <Rect
          x={40}
          y={450}
          width={CARD_WIDTH - 80}
          height={70}
          fill="rgba(0, 0, 0, 0.2)"
          cornerRadius={6}
          stroke="#505050"
          strokeWidth={2}
        />
        <Text
          x={70}
          y={465}
          text="AVG"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill={template.secondaryTextColor}
          fontStyle="bold"
        />
        <Text
          x={70}
          y={485}
          text={cardData.stats?.avg || '.000'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
        <Text
          x={165}
          y={465}
          text="HR"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill={template.secondaryTextColor}
          fontStyle="bold"
        />
        <Text
          x={170}
          y={485}
          text={cardData.stats?.hr || '0'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
        <Text
          x={260}
          y={465}
          text="RBI"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill={template.secondaryTextColor}
          fontStyle="bold"
        />
        <Text
          x={265}
          y={485}
          text={cardData.stats?.rbi || '0'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
      </>
    );
  };

  const renderHolographicTemplate = () => {
    return (
      <>
        {/* Dark space background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fill={template.backgroundColor}
          cornerRadius={15}
        />

        {/* Holographic shifting borders */}
        <Rect
          x={8}
          y={8}
          width={CARD_WIDTH - 16}
          height={CARD_HEIGHT - 16}
          stroke={template.accentColor}
          strokeWidth={4}
          cornerRadius={12}
          shadowColor={template.accentColor}
          shadowBlur={20}
          shadowOpacity={0.8}
        />
        <Rect
          x={15}
          y={15}
          width={CARD_WIDTH - 30}
          height={CARD_HEIGHT - 30}
          stroke={template.secondaryAccent}
          strokeWidth={2}
          cornerRadius={10}
          shadowColor={template.secondaryAccent}
          shadowBlur={15}
          shadowOpacity={0.6}
        />

        {/* Player Image */}
        {renderDraggablePlayerImage(35, 35, CARD_WIDTH - 70, 290)}

        {/* Team Logo */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={CARD_WIDTH - 85}
            y={25}
            width={60}
            height={60}
            shadowColor={template.tertiaryAccent}
            shadowBlur={15}
          />
        )}

        {/* Player Name with holographic glow */}
        <Text
          x={25}
          y={345}
          width={CARD_WIDTH - 50}
          text={cardData.playerName.toUpperCase()}
          fontSize={32}
          fontFamily={template.fontFamily}
          fill={template.accentColor}
          align="center"
          fontStyle="bold"
          shadowColor={template.secondaryAccent}
          shadowBlur={15}
          shadowOpacity={1}
        />

        {/* Team Name */}
        <Text
          x={25}
          y={390}
          width={CARD_WIDTH - 50}
          text={cardData.teamName.toUpperCase()}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill={template.secondaryTextColor}
          align="center"
          shadowColor={template.accentColor}
          shadowBlur={10}
        />

        {/* Stats with rainbow glow */}
        <Rect
          x={50}
          y={430}
          width={80}
          height={80}
          stroke={template.accentColor}
          strokeWidth={2}
          cornerRadius={8}
          shadowColor={template.accentColor}
          shadowBlur={12}
        />
        <Text
          x={50}
          y={445}
          width={80}
          text="AVG"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
        />
        <Text
          x={50}
          y={470}
          width={80}
          text={cardData.stats?.avg || '.000'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.accentColor}
          align="center"
          fontStyle="bold"
          shadowColor={template.accentColor}
          shadowBlur={8}
        />

        <Rect
          x={160}
          y={430}
          width={80}
          height={80}
          stroke={template.secondaryAccent}
          strokeWidth={2}
          cornerRadius={8}
          shadowColor={template.secondaryAccent}
          shadowBlur={12}
        />
        <Text
          x={160}
          y={445}
          width={80}
          text="HR"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
        />
        <Text
          x={160}
          y={470}
          width={80}
          text={cardData.stats?.hr || '0'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.secondaryAccent}
          align="center"
          fontStyle="bold"
          shadowColor={template.secondaryAccent}
          shadowBlur={8}
        />

        <Rect
          x={270}
          y={430}
          width={80}
          height={80}
          stroke={template.tertiaryAccent || template.accentColor}
          strokeWidth={2}
          cornerRadius={8}
          shadowColor={template.tertiaryAccent || template.accentColor}
          shadowBlur={12}
        />
        <Text
          x={270}
          y={445}
          width={80}
          text="RBI"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
        />
        <Text
          x={270}
          y={470}
          width={80}
          text={cardData.stats?.rbi || '0'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.tertiaryAccent || template.accentColor}
          align="center"
          fontStyle="bold"
          shadowColor={template.tertiaryAccent || template.accentColor}
          shadowBlur={8}
        />
      </>
    );
  };

  const renderGalaxyTemplate = () => {
    return (
      <>
        {/* Deep space background with stars */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fillRadialGradientStartPoint={{ x: CARD_WIDTH / 2, y: CARD_HEIGHT / 2 }}
          fillRadialGradientEndPoint={{ x: CARD_WIDTH / 2, y: CARD_HEIGHT / 2 }}
          fillRadialGradientStartRadius={0}
          fillRadialGradientEndRadius={CARD_HEIGHT}
          fillRadialGradientColorStops={[0, '#1A0B2E', 0.5, '#0B0B1A', 1, '#000000']}
          cornerRadius={15}
        />

        {/* Purple nebula border */}
        <Rect
          x={10}
          y={10}
          width={CARD_WIDTH - 20}
          height={CARD_HEIGHT - 20}
          stroke={template.borderColor}
          strokeWidth={4}
          cornerRadius={12}
          shadowColor={template.accentColor}
          shadowBlur={25}
          shadowOpacity={0.9}
        />

        {/* Player Image */}
        {renderDraggablePlayerImage(35, 35, CARD_WIDTH - 70, 300)}

        {/* Team Logo with glow */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={CARD_WIDTH - 85}
            y={25}
            width={60}
            height={60}
            shadowColor={template.secondaryAccent}
            shadowBlur={15}
          />
        )}

        {/* Player Name with cosmic glow */}
        <Rect
          x={25}
          y={350}
          width={CARD_WIDTH - 50}
          height={50}
          fillRadialGradientStartPoint={{ x: (CARD_WIDTH - 50) / 2, y: 25 }}
          fillRadialGradientEndPoint={{ x: (CARD_WIDTH - 50) / 2, y: 25 }}
          fillRadialGradientStartRadius={0}
          fillRadialGradientEndRadius={150}
          fillRadialGradientColorStops={[0, template.accentColor, 1, 'rgba(157, 78, 221, 0.2)']}
          cornerRadius={10}
        />
        <Text
          x={25}
          y={362}
          width={CARD_WIDTH - 50}
          text={cardData.playerName.toUpperCase()}
          fontSize={30}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
          fontStyle="bold"
          shadowColor={template.secondaryAccent}
          shadowBlur={12}
        />

        {/* Team Name */}
        <Text
          x={25}
          y={410}
          width={CARD_WIDTH - 50}
          text={cardData.teamName.toUpperCase()}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill={template.secondaryTextColor}
          align="center"
        />

        {/* Stats */}
        <Rect
          x={40}
          y={450}
          width={CARD_WIDTH - 80}
          height={70}
          fill="rgba(157, 78, 221, 0.15)"
          cornerRadius={10}
          stroke={template.accentColor}
          strokeWidth={2}
          shadowColor={template.accentColor}
          shadowBlur={10}
        />
        <Text
          x={70}
          y={465}
          text={`AVG: ${cardData.stats?.avg || '.000'}`}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
        <Text
          x={180}
          y={465}
          text={`HR: ${cardData.stats?.hr || '0'}`}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
        <Text
          x={70}
          y={490}
          text={`RBI: ${cardData.stats?.rbi || '0'}`}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
      </>
    );
  };

  const renderRainbowTemplate = () => {
    return (
      <>
        {/* White background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fill={template.backgroundColor}
          cornerRadius={15}
        />

        {/* Rainbow gradient border */}
        <Rect
          x={10}
          y={10}
          width={CARD_WIDTH - 20}
          height={CARD_HEIGHT - 20}
          strokeWidth={8}
          strokeLinearGradientStartPoint={{ x: 0, y: 0 }}
          strokeLinearGradientEndPoint={{ x: CARD_WIDTH, y: CARD_HEIGHT }}
          strokeLinearGradientColorStops={[0, '#FF0080', 0.25, '#FF8C00', 0.5, '#FFD700', 0.75, '#00D9FF', 1, '#8B00FF']}
          cornerRadius={12}
        />

        {/* Player Image */}
        {renderDraggablePlayerImage(35, 35, CARD_WIDTH - 70, 300)}

        {/* Team Logo */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={CARD_WIDTH - 85}
            y={25}
            width={60}
            height={60}
          />
        )}

        {/* Player Name with gradient */}
        <Rect
          x={30}
          y={350}
          width={CARD_WIDTH - 60}
          height={50}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: CARD_WIDTH - 60, y: 0 }}
          fillLinearGradientColorStops={[0, template.accentColor, 0.5, template.secondaryAccent, 1, template.tertiaryAccent || template.accentColor]}
          cornerRadius={10}
        />
        <Text
          x={30}
          y={362}
          width={CARD_WIDTH - 60}
          text={cardData.playerName.toUpperCase()}
          fontSize={28}
          fontFamily={template.fontFamily}
          fill="#FFFFFF"
          align="center"
          fontStyle="bold"
        />

        {/* Team Name */}
        <Text
          x={30}
          y={415}
          width={CARD_WIDTH - 60}
          text={cardData.teamName}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
          fontStyle="bold"
        />

        {/* Stats */}
        <Rect
          x={50}
          y={455}
          width={80}
          height={70}
          fill={template.accentColor}
          cornerRadius={10}
        />
        <Text
          x={50}
          y={468}
          width={80}
          text="AVG"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill="#FFFFFF"
          align="center"
          fontStyle="bold"
        />
        <Text
          x={50}
          y={490}
          width={80}
          text={cardData.stats?.avg || '.000'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill="#FFFFFF"
          align="center"
          fontStyle="bold"
        />

        <Rect
          x={160}
          y={455}
          width={80}
          height={70}
          fill={template.secondaryAccent}
          cornerRadius={10}
        />
        <Text
          x={160}
          y={468}
          width={80}
          text="HR"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill="#FFFFFF"
          align="center"
          fontStyle="bold"
        />
        <Text
          x={160}
          y={490}
          width={80}
          text={cardData.stats?.hr || '0'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill="#FFFFFF"
          align="center"
          fontStyle="bold"
        />

        <Rect
          x={270}
          y={455}
          width={80}
          height={70}
          fill={template.tertiaryAccent || template.accentColor}
          cornerRadius={10}
        />
        <Text
          x={270}
          y={468}
          width={80}
          text="RBI"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill="#FFFFFF"
          align="center"
          fontStyle="bold"
        />
        <Text
          x={270}
          y={490}
          width={80}
          text={cardData.stats?.rbi || '0'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill="#FFFFFF"
          align="center"
          fontStyle="bold"
        />
      </>
    );
  };

  const renderGrungeTemplate = () => {
    return (
      <>
        {/* Dark grungy background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fill={template.backgroundColor}
          cornerRadius={5}
        />

        {/* Distressed borders */}
        <Rect
          x={5}
          y={5}
          width={CARD_WIDTH - 10}
          height={CARD_HEIGHT - 10}
          stroke={template.borderColor}
          strokeWidth={6}
        />
        <Rect
          x={15}
          y={15}
          width={CARD_WIDTH - 30}
          height={CARD_HEIGHT - 30}
          stroke={template.accentColor}
          strokeWidth={2}
        />

        {/* Player Image */}
        {renderDraggablePlayerImage(35, 35, CARD_WIDTH - 70, 310)}

        {/* Team Logo */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={25}
            y={25}
            width={70}
            height={70}
            opacity={0.9}
          />
        )}

        {/* Player Name with rough edges */}
        <Rect
          x={25}
          y={360}
          width={CARD_WIDTH - 50}
          height={50}
          fill={template.borderColor}
        />
        <Text
          x={25}
          y={372}
          width={CARD_WIDTH - 50}
          text={cardData.playerName.toUpperCase()}
          fontSize={30}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
          fontStyle="bold"
        />

        {/* Team Name */}
        <Text
          x={25}
          y={420}
          width={CARD_WIDTH - 50}
          text={cardData.teamName.toUpperCase()}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill={template.secondaryTextColor}
          align="center"
        />

        {/* Stats */}
        <Rect
          x={35}
          y={460}
          width={CARD_WIDTH - 70}
          height={65}
          fill="rgba(0, 0, 0, 0.4)"
          stroke={template.accentColor}
          strokeWidth={2}
        />
        <Text
          x={60}
          y={475}
          text={`AVG: ${cardData.stats?.avg || '.000'}`}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
        <Text
          x={200}
          y={475}
          text={`HR: ${cardData.stats?.hr || '0'}`}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
        <Text
          x={60}
          y={500}
          text={`RBI: ${cardData.stats?.rbi || '0'}`}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          fontStyle="bold"
        />
      </>
    );
  };

  const renderPolaroidTemplate = () => {
    return (
      <>
        {/* Polaroid background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fill={template.backgroundColor}
        />

        {/* Thin border */}
        <Rect
          x={5}
          y={5}
          width={CARD_WIDTH - 10}
          height={CARD_HEIGHT - 10}
          stroke={template.borderColor}
          strokeWidth={1}
        />

        {/* Photo area with white frame */}
        <Rect
          x={25}
          y={25}
          width={CARD_WIDTH - 50}
          height={340}
          fill="#FFFFFF"
        />

        {/* Player Image */}
        {renderDraggablePlayerImage(30, 30, CARD_WIDTH - 60, 330)}

        {/* Team Logo - small in corner */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={CARD_WIDTH - 75}
            y={375}
            width={50}
            height={50}
            opacity={0.7}
          />
        )}

        {/* Player Name - handwritten style */}
        <Text
          x={30}
          y={380}
          width={CARD_WIDTH - 60}
          text={cardData.playerName}
          fontSize={28}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="left"
        />

        {/* Team Name */}
        <Text
          x={30}
          y={415}
          width={CARD_WIDTH - 60}
          text={cardData.teamName}
          fontSize={16}
          fontFamily={template.fontFamily}
          fill={template.secondaryTextColor}
          align="left"
        />

        {/* Stats - written style */}
        <Line
          points={[30, 450, CARD_WIDTH - 30, 450]}
          stroke={template.accentColor}
          strokeWidth={1}
          dash={[5, 5]}
        />
        <Text
          x={30}
          y={465}
          text={`AVG ${cardData.stats?.avg || '.000'}  |  HR ${cardData.stats?.hr || '0'}  |  RBI ${cardData.stats?.rbi || '0'}`}
          fontSize={14}
          fontFamily={template.fontFamily}
          fill={template.textColor}
        />
      </>
    );
  };

  const renderNeonTemplate = () => {
    return (
      <>
        {/* Dark Background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fill={template.backgroundColor}
          cornerRadius={20}
        />

        {/* Neon Glow Border */}
        <Rect
          x={10}
          y={10}
          width={CARD_WIDTH - 20}
          height={CARD_HEIGHT - 20}
          stroke={template.accentColor}
          strokeWidth={3}
          cornerRadius={15}
          shadowColor={template.accentColor}
          shadowBlur={20}
          shadowOpacity={0.8}
        />

        {/* Inner Border */}
        <Rect
          x={20}
          y={20}
          width={CARD_WIDTH - 40}
          height={CARD_HEIGHT - 40}
          stroke={template.secondaryAccent}
          strokeWidth={2}
          cornerRadius={10}
          shadowColor={template.secondaryAccent}
          shadowBlur={15}
          shadowOpacity={0.6}
        />

        {/* Player Image with dragging */}
        {renderDraggablePlayerImage(40, 40, CARD_WIDTH - 80, 300)}

        {/* Team Logo with Glow */}
        {teamLogo && (
          <KonvaImage
            image={teamLogo}
            x={CARD_WIDTH - 90}
            y={30}
            width={60}
            height={60}
            shadowColor={template.accentColor}
            shadowBlur={10}
          />
        )}

        {/* Player Name with Neon Effect */}
        <Text
          x={30}
          y={360}
          width={CARD_WIDTH - 60}
          text={cardData.playerName.toUpperCase()}
          fontSize={32}
          fontFamily={template.fontFamily}
          fill={template.accentColor}
          align="center"
          fontStyle="bold"
          shadowColor={template.accentColor}
          shadowBlur={10}
          shadowOpacity={1}
        />

        {/* Team Name */}
        <Text
          x={30}
          y={405}
          width={CARD_WIDTH - 60}
          text={cardData.teamName.toUpperCase()}
          fontSize={18}
          fontFamily={template.fontFamily}
          fill={template.secondaryAccent}
          align="center"
          shadowColor={template.secondaryAccent}
          shadowBlur={8}
        />

        {/* Stats with Glow Boxes */}
        <Rect
          x={50}
          y={450}
          width={80}
          height={70}
          stroke={template.accentColor}
          strokeWidth={2}
          cornerRadius={8}
          shadowColor={template.accentColor}
          shadowBlur={10}
        />
        <Text
          x={50}
          y={460}
          width={80}
          text="AVG"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
        />
        <Text
          x={50}
          y={485}
          width={80}
          text={cardData.stats?.avg || '.000'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.accentColor}
          align="center"
          fontStyle="bold"
          shadowColor={template.accentColor}
          shadowBlur={5}
        />

        <Rect
          x={160}
          y={450}
          width={80}
          height={70}
          stroke={template.secondaryAccent}
          strokeWidth={2}
          cornerRadius={8}
          shadowColor={template.secondaryAccent}
          shadowBlur={10}
        />
        <Text
          x={160}
          y={460}
          width={80}
          text="HR"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
        />
        <Text
          x={160}
          y={485}
          width={80}
          text={cardData.stats?.hr || '0'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.secondaryAccent}
          align="center"
          fontStyle="bold"
          shadowColor={template.secondaryAccent}
          shadowBlur={5}
        />

        <Rect
          x={270}
          y={450}
          width={80}
          height={70}
          stroke={template.accentColor}
          strokeWidth={2}
          cornerRadius={8}
          shadowColor={template.accentColor}
          shadowBlur={10}
        />
        <Text
          x={270}
          y={460}
          width={80}
          text="RBI"
          fontSize={12}
          fontFamily={template.fontFamily}
          fill={template.textColor}
          align="center"
        />
        <Text
          x={270}
          y={485}
          width={80}
          text={cardData.stats?.rbi || '0'}
          fontSize={20}
          fontFamily={template.fontFamily}
          fill={template.accentColor}
          align="center"
          fontStyle="bold"
          shadowColor={template.accentColor}
          shadowBlur={5}
        />
      </>
    );
  };

  const renderCardBack = () => {
    const stats = cardData.stats || {};
    const fontSize = 12;
    const startY = 80;

    return (
      <>
        {/* Background */}
        <Rect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          fill={template.backgroundColor || '#FFFFFF'}
          cornerRadius={10}
        />

        {/* Header */}
        <Rect
          x={15}
          y={15}
          width={CARD_WIDTH - 30}
          height={50}
          fill={template.accentColor || '#2E7D32'}
          cornerRadius={8}
        />
        <Text
          x={20}
          y={28}
          width={CARD_WIDTH - 40}
          text={cardData.playerName.toUpperCase()}
          fontSize={20}
          fontFamily="Arial, sans-serif"
          fill="#FFFFFF"
          align="center"
          fontStyle="bold"
        />

        {/* Player Info Section */}
        <Text x={30} y={startY} text="PLAYER INFORMATION" fontSize={10} fontFamily="Arial" fill={template.textColor || '#000'} fontStyle="bold" />
        <Line points={[30, startY + 12, CARD_WIDTH - 30, startY + 12]} stroke={template.accentColor || '#2E7D32'} strokeWidth={1} />

        <Text x={30} y={startY + 20} text={`Team: ${cardData.teamName}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        <Text x={30} y={startY + 36} text={`Position: ${cardData.position || 'N/A'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        <Text x={30} y={startY + 52} text={`Year: ${cardData.year}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        {cardData.hometown && <Text x={30} y={startY + 68} text={`Hometown: ${cardData.hometown}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />}
        {cardData.height && <Text x={30} y={startY + 84} text={`Height: ${cardData.height}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />}
        {cardData.weight && <Text x={30} y={startY + 100} text={`Weight: ${cardData.weight}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />}
        {cardData.batsThrows && <Text x={30} y={startY + 116} text={`Bats/Throws: ${cardData.batsThrows}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />}

        {/* Batting Stats Section */}
        <Text x={30} y={startY + 140} text="BATTING STATISTICS" fontSize={10} fontFamily="Arial" fill={template.textColor || '#000'} fontStyle="bold" />
        <Line points={[30, startY + 152, CARD_WIDTH - 30, startY + 152]} stroke={template.accentColor || '#2E7D32'} strokeWidth={1} />

        <Rect x={25} y={startY + 160} width={CARD_WIDTH - 50} height={140} fill="rgba(0,0,0,0.03)" cornerRadius={5} />

        <Text x={35} y={startY + 170} text={`AVG: ${stats.avg || '.000'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        <Text x={135} y={startY + 170} text={`G: ${stats.games || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        <Text x={220} y={startY + 170} text={`AB: ${stats.atBats || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />

        <Text x={35} y={startY + 190} text={`H: ${stats.hits || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        <Text x={135} y={startY + 190} text={`2B: ${stats.doubles || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        <Text x={220} y={startY + 190} text={`3B: ${stats.triples || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />

        <Text x={35} y={startY + 210} text={`HR: ${stats.hr || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        <Text x={135} y={startY + 210} text={`RBI: ${stats.rbi || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        <Text x={220} y={startY + 210} text={`SB: ${stats.sb || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />

        <Text x={35} y={startY + 230} text={`BB: ${stats.walks || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        <Text x={135} y={startY + 230} text={`SO: ${stats.strikeouts || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />

        <Text x={35} y={startY + 250} text={`OBP: ${stats.obp || '.000'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
        <Text x={135} y={startY + 250} text={`SLG: ${stats.slg || '.000'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />

        {/* Pitching Stats Section (if applicable) */}
        {(stats.era || stats.wins || stats.ip) && (
          <>
            <Text x={30} y={startY + 320} text="PITCHING STATISTICS" fontSize={10} fontFamily="Arial" fill={template.textColor || '#000'} fontStyle="bold" />
            <Line points={[30, startY + 332, CARD_WIDTH - 30, startY + 332]} stroke={template.accentColor || '#2E7D32'} strokeWidth={1} />

            <Rect x={25} y={startY + 340} width={CARD_WIDTH - 50} height={100} fill="rgba(0,0,0,0.03)" cornerRadius={5} />

            <Text x={35} y={startY + 350} text={`ERA: ${stats.era || 'N/A'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
            <Text x={135} y={startY + 350} text={`W: ${stats.wins || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
            <Text x={220} y={startY + 350} text={`L: ${stats.losses || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />

            <Text x={35} y={startY + 370} text={`SV: ${stats.saves || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
            <Text x={135} y={startY + 370} text={`IP: ${stats.ip || '0.0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />

            <Text x={35} y={startY + 390} text={`K: ${stats.strikeoutsP || '0'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
            <Text x={135} y={startY + 390} text={`WHIP: ${stats.whip || 'N/A'}`} fontSize={fontSize} fontFamily="Arial" fill={template.textColor || '#000'} />
          </>
        )}

        {/* Footer */}
        <Rect
          x={15}
          y={CARD_HEIGHT - 35}
          width={CARD_WIDTH - 30}
          height={20}
          fill={template.accentColor || '#2E7D32'}
        />
        <Text
          x={20}
          y={CARD_HEIGHT - 30}
          width={CARD_WIDTH - 40}
          text={`© ${cardData.year} Baseball Card Creator`}
          fontSize={9}
          fontFamily="Arial"
          fill="#FFFFFF"
          align="center"
        />
      </>
    );
  };

  const renderTemplate = () => {
    if (showBack) {
      return renderCardBack();
    }

    // Use layered renderer for templates with layer definitions
    if (template.layers) {
      return renderLayeredTemplate();
    }

    switch (template.id) {
      case 'modern':
        return renderModernTemplate();
      case 'vintage':
        return renderVintageTemplate();
      case 'minimalist':
        return renderMinimalistTemplate();
      case 'neon':
        return renderNeonTemplate();
      case 'retro80s':
        return renderRetro80sTemplate();
      case 'chrome':
        return renderChromeTemplate();
      case 'holographic':
        return renderHolographicTemplate();
      case 'galaxy':
        return renderGalaxyTemplate();
      case 'rainbow':
        return renderRainbowTemplate();
      case 'grunge':
        return renderGrungeTemplate();
      case 'polaroid':
        return renderPolaroidTemplate();
      case 'classic':
      default:
        return renderClassicTemplate();
    }
  };

  return (
    <div className="card-canvas-container">
      <Stage width={CARD_WIDTH} height={CARD_HEIGHT} ref={stageRef}>
        <Layer>
          {renderTemplate()}
        </Layer>
      </Stage>
    </div>
  );
};

export default CardCanvas;
