import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CardCanvas from '../components/CardCanvas';
import CardEditor from '../components/CardEditor';
import { cardTemplates } from '../utils/cardTemplates';
import { generateAnimatedGifFromRefs } from '../utils/gifGenerator';
import '../styles/Creator.css';

const Creator = () => {
  const navigate = useNavigate();
  const frontStageRef = useRef(null);
  const backStageRef = useRef(null);

  const [selectedTemplate, setSelectedTemplate] = useState(cardTemplates[0]);
  const [cardData, setCardData] = useState({
    playerName: 'Player Name',
    teamName: 'Team Name',
    position: '',
    year: new Date().getFullYear(),
    hometown: '',
    height: '',
    weight: '',
    batsThrows: '',
    playerImage: null,
    teamLogo: null,
    stats: {
      avg: '.000',
      hr: '0',
      rbi: '0',
      games: '0',
      hits: '0',
      sb: '0',
      atBats: '0',
      doubles: '0',
      triples: '0',
      walks: '0',
      strikeouts: '0',
      obp: '.000',
      slg: '.000',
      era: '',
      wins: '',
      losses: '',
      saves: '',
      ip: '',
      strikeoutsP: '',
      whip: ''
    }
  });

  const [saving, setSaving] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [featuredStats, setFeaturedStats] = useState([]);

  const handleSave = async () => {
    if (!cardData.playerImage) {
      toast.error('Please upload a player image');
      return;
    }

    setSaving(true);
    try {
      // Capture FRONT of card from frontStageRef
      const frontDataURL = frontStageRef.current.toDataURL({
        pixelRatio: 2,
        mimeType: 'image/jpeg',
        quality: 0.8
      });

      const frontThumbnailURL = frontStageRef.current.toDataURL({
        pixelRatio: 0.5,
        mimeType: 'image/jpeg',
        quality: 0.6
      });

      // Capture BACK of card from backStageRef
      const backDataURL = backStageRef.current.toDataURL({
        pixelRatio: 2,
        mimeType: 'image/jpeg',
        quality: 0.8
      });

      const backThumbnailURL = backStageRef.current.toDataURL({
        pixelRatio: 0.5,
        mimeType: 'image/jpeg',
        quality: 0.6
      });

      // Generate animated GIF
      toast.info('Generating animated GIF...');
      const animatedGifURL = await generateAnimatedGifFromRefs(
        frontStageRef,
        backStageRef,
        1500
      );

      await axios.post('https://ballcard.me/api/cards', {
        imageData: frontDataURL,
        backImageData: backDataURL,
        animatedGif: animatedGifURL,
        thumbnail: frontThumbnailURL,
        backThumbnail: backThumbnailURL,
        template: selectedTemplate.id,
        cardData: cardData,
        featuredStats: featuredStats,
        title: `${cardData.playerName} - ${cardData.teamName}`
      });

      toast.success('Card saved successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error(error.response?.data?.message || 'Failed to save card');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    if (!cardData.playerImage) {
      toast.error('Please upload a player image');
      return;
    }

    try {
      // Download FRONT from frontStageRef
      const frontDataURL = frontStageRef.current.toDataURL({ pixelRatio: 3 });
      const frontLink = document.createElement('a');
      frontLink.download = `${cardData.playerName.replace(/\s+/g, '_')}_front.jpg`;
      frontLink.href = frontDataURL;
      document.body.appendChild(frontLink);
      frontLink.click();
      document.body.removeChild(frontLink);

      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 200));

      // Download BACK from backStageRef
      const backDataURL = backStageRef.current.toDataURL({ pixelRatio: 3 });
      const backLink = document.createElement('a');
      backLink.download = `${cardData.playerName.replace(/\s+/g, '_')}_back.jpg`;
      backLink.href = backDataURL;
      document.body.appendChild(backLink);
      backLink.click();
      document.body.removeChild(backLink);

      toast.success('Front and back downloaded!');
    } catch (error) {
      console.error('Error downloading card:', error);
      toast.error('Failed to download card');
    }
  };

  const handleDownloadGif = async () => {
    if (!cardData.playerImage) {
      toast.error('Please upload a player image');
      return;
    }

    try {
      toast.info('Generating animated GIF... This may take a moment.');

      // Generate animated GIF
      const animatedGifURL = await generateAnimatedGifFromRefs(
        frontStageRef,
        backStageRef,
        1500
      );

      // Download the GIF
      const link = document.createElement('a');
      link.download = `${cardData.playerName.replace(/\s+/g, '_')}_animated.gif`;
      link.href = animatedGifURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Animated GIF downloaded!');
    } catch (error) {
      console.error('Error downloading animated GIF:', error);
      toast.error('Failed to generate animated GIF');
    }
  };

  return (
    <div className="creator">
      <div className="creator-header">
        <h1>Create Your Baseball Card</h1>
      </div>

      <div className="creator-container">
        <div className="canvas-section">
          <div className="card-view-toggle">
            <button
              className={`toggle-btn ${!showBack ? 'active' : ''}`}
              onClick={() => setShowBack(false)}
            >
              Front
            </button>
            <button
              className={`toggle-btn ${showBack ? 'active' : ''}`}
              onClick={() => setShowBack(true)}
            >
              Back
            </button>
          </div>
          <div className="card-flip-container">
            <div className={`card-flipper ${showBack ? 'flipped' : ''}`}>
              <div className="card-side front">
                <CardCanvas
                  cardData={cardData}
                  template={selectedTemplate}
                  stageRef={frontStageRef}
                  showBack={false}
                  featuredStats={featuredStats}
                />
              </div>
              <div className="card-side back">
                <CardCanvas
                  cardData={cardData}
                  template={selectedTemplate}
                  stageRef={backStageRef}
                  showBack={true}
                  featuredStats={featuredStats}
                />
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button
              className="btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : '💾 Save Card'}
            </button>
            <button
              className="btn-secondary"
              onClick={handleDownload}
            >
              📥 Download Images
            </button>
            <button
              className="btn-secondary"
              onClick={handleDownloadGif}
            >
              🎬 Download GIF
            </button>
          </div>
        </div>

        <div className="editor-section">
          <CardEditor
            cardData={cardData}
            setCardData={setCardData}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            featuredStats={featuredStats}
            setFeaturedStats={setFeaturedStats}
          />
        </div>
      </div>
    </div>
  );
};

export default Creator;
