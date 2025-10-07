import React, { useState } from 'react';
import { getAllCategories, getTemplatesByCategory } from '../utils/cardTemplates';
import '../styles/CardEditor.css';

const CardEditor = ({ cardData, setCardData, selectedTemplate, setSelectedTemplate, featuredStats, setFeaturedStats }) => {
  const [activeTab, setActiveTab] = useState('template');

  const handleInputChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStatsChange = (stat, value) => {
    setCardData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: value
      }
    }));
  };

  const handleImageUpload = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange(field, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card-editor">
      <div className="editor-tabs">
        <button
          className={`tab ${activeTab === 'template' ? 'active' : ''}`}
          onClick={() => setActiveTab('template')}
        >
          Template
        </button>
        <button
          className={`tab ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button
          className={`tab ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          Images
        </button>
        <button
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Stats
        </button>
        <button
          className={`tab ${activeTab === 'featured' ? 'active' : ''}`}
          onClick={() => setActiveTab('featured')}
        >
          Featured Stats
        </button>
      </div>

      <div className="editor-content">
        {activeTab === 'template' && (
          <div className="editor-section">
            <h3>Choose Template</h3>
            {getAllCategories().map(category => {
              const templatesInCategory = getTemplatesByCategory(category);
              if (templatesInCategory.length === 0) return null;

              return (
                <div key={category} className="template-category">
                  <h4 className="category-title">{category}</h4>
                  <div className="template-grid">
                    {templatesInCategory.map(template => (
                      <div
                        key={template.id}
                        className={`template-option ${selectedTemplate.id === template.id ? 'selected' : ''}`}
                        onClick={() => setSelectedTemplate(template)}
                        title={template.description || template.name}
                      >
                        <div
                          className="template-preview"
                          style={{
                            background: template.backgroundColor,
                            border: `3px solid ${template.borderColor}`
                          }}
                        >
                          <div className="template-name" style={{ color: template.textColor }}>
                            {template.name}
                          </div>
                          {template.vintage && (
                            <div className="template-badge" style={{ background: '#DC2626', color: '#fff' }}>
                              Vintage
                            </div>
                          )}
                          {template.texture && (
                            <div className="template-badge" style={{ background: '#10b981', color: '#fff' }}>
                              Textured
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'details' && (
          <div className="editor-section">
            <h3>Player Details</h3>
            <div className="form-group">
              <label>Player Name</label>
              <input
                type="text"
                value={cardData.playerName}
                onChange={(e) => handleInputChange('playerName', e.target.value)}
                placeholder="Enter player name"
              />
            </div>
            <div className="form-group">
              <label>Team Name</label>
              <input
                type="text"
                value={cardData.teamName}
                onChange={(e) => handleInputChange('teamName', e.target.value)}
                placeholder="Enter team name"
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <select
                value={cardData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
              >
                <option value="">Select Position</option>
                <option value="P">Pitcher</option>
                <option value="C">Catcher</option>
                <option value="1B">First Base</option>
                <option value="2B">Second Base</option>
                <option value="3B">Third Base</option>
                <option value="SS">Shortstop</option>
                <option value="LF">Left Field</option>
                <option value="CF">Center Field</option>
                <option value="RF">Right Field</option>
                <option value="DH">Designated Hitter</option>
              </select>
            </div>
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                value={cardData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                placeholder="2024"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            <div className="form-group">
              <label>Hometown</label>
              <input
                type="text"
                value={cardData.hometown || ''}
                onChange={(e) => handleInputChange('hometown', e.target.value)}
                placeholder="City, State"
              />
            </div>
            <div className="form-group">
              <label>Height</label>
              <input
                type="text"
                value={cardData.height || ''}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="6'2&quot;"
              />
            </div>
            <div className="form-group">
              <label>Weight</label>
              <input
                type="text"
                value={cardData.weight || ''}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="210 lbs"
              />
            </div>
            <div className="form-group">
              <label>Bats/Throws</label>
              <input
                type="text"
                value={cardData.batsThrows || ''}
                onChange={(e) => handleInputChange('batsThrows', e.target.value)}
                placeholder="R/R"
              />
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="editor-section">
            <h3>Upload Images</h3>
            <div className="form-group">
              <label>Player Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload('playerImage', e.target.files[0])}
              />
              {cardData.playerImage && (
                <div className="image-preview">
                  <img src={cardData.playerImage} alt="Player preview" />
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Team Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload('teamLogo', e.target.files[0])}
              />
              {cardData.teamLogo && (
                <div className="image-preview">
                  <img src={cardData.teamLogo} alt="Logo preview" />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="editor-section">
            <h3>Player Statistics</h3>

            <h4 style={{marginTop: '1rem', marginBottom: '0.5rem', color: '#4b5563'}}>Batting Stats</h4>
            <div className="stats-grid">
              <div className="form-group">
                <label>Batting Average</label>
                <input
                  type="text"
                  value={cardData.stats?.avg || ''}
                  onChange={(e) => handleStatsChange('avg', e.target.value)}
                  placeholder=".300"
                />
              </div>
              <div className="form-group">
                <label>Games Played</label>
                <input
                  type="number"
                  value={cardData.stats?.games || ''}
                  onChange={(e) => handleStatsChange('games', e.target.value)}
                  placeholder="162"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>At Bats</label>
                <input
                  type="number"
                  value={cardData.stats?.atBats || ''}
                  onChange={(e) => handleStatsChange('atBats', e.target.value)}
                  placeholder="550"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Hits</label>
                <input
                  type="number"
                  value={cardData.stats?.hits || ''}
                  onChange={(e) => handleStatsChange('hits', e.target.value)}
                  placeholder="150"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Doubles</label>
                <input
                  type="number"
                  value={cardData.stats?.doubles || ''}
                  onChange={(e) => handleStatsChange('doubles', e.target.value)}
                  placeholder="30"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Triples</label>
                <input
                  type="number"
                  value={cardData.stats?.triples || ''}
                  onChange={(e) => handleStatsChange('triples', e.target.value)}
                  placeholder="5"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Home Runs</label>
                <input
                  type="number"
                  value={cardData.stats?.hr || ''}
                  onChange={(e) => handleStatsChange('hr', e.target.value)}
                  placeholder="25"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>RBIs</label>
                <input
                  type="number"
                  value={cardData.stats?.rbi || ''}
                  onChange={(e) => handleStatsChange('rbi', e.target.value)}
                  placeholder="80"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Stolen Bases</label>
                <input
                  type="number"
                  value={cardData.stats?.sb || ''}
                  onChange={(e) => handleStatsChange('sb', e.target.value)}
                  placeholder="15"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Walks</label>
                <input
                  type="number"
                  value={cardData.stats?.walks || ''}
                  onChange={(e) => handleStatsChange('walks', e.target.value)}
                  placeholder="60"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Strikeouts</label>
                <input
                  type="number"
                  value={cardData.stats?.strikeouts || ''}
                  onChange={(e) => handleStatsChange('strikeouts', e.target.value)}
                  placeholder="120"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>OBP</label>
                <input
                  type="text"
                  value={cardData.stats?.obp || ''}
                  onChange={(e) => handleStatsChange('obp', e.target.value)}
                  placeholder=".375"
                />
              </div>
              <div className="form-group">
                <label>SLG</label>
                <input
                  type="text"
                  value={cardData.stats?.slg || ''}
                  onChange={(e) => handleStatsChange('slg', e.target.value)}
                  placeholder=".450"
                />
              </div>
            </div>

            <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem', color: '#4b5563'}}>Pitching Stats (if applicable)</h4>
            <div className="stats-grid">
              <div className="form-group">
                <label>ERA</label>
                <input
                  type="text"
                  value={cardData.stats?.era || ''}
                  onChange={(e) => handleStatsChange('era', e.target.value)}
                  placeholder="3.50"
                />
              </div>
              <div className="form-group">
                <label>Wins</label>
                <input
                  type="number"
                  value={cardData.stats?.wins || ''}
                  onChange={(e) => handleStatsChange('wins', e.target.value)}
                  placeholder="15"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Losses</label>
                <input
                  type="number"
                  value={cardData.stats?.losses || ''}
                  onChange={(e) => handleStatsChange('losses', e.target.value)}
                  placeholder="8"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Saves</label>
                <input
                  type="number"
                  value={cardData.stats?.saves || ''}
                  onChange={(e) => handleStatsChange('saves', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Innings Pitched</label>
                <input
                  type="text"
                  value={cardData.stats?.ip || ''}
                  onChange={(e) => handleStatsChange('ip', e.target.value)}
                  placeholder="180.0"
                />
              </div>
              <div className="form-group">
                <label>Strikeouts (P)</label>
                <input
                  type="number"
                  value={cardData.stats?.strikeoutsP || ''}
                  onChange={(e) => handleStatsChange('strikeoutsP', e.target.value)}
                  placeholder="200"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>WHIP</label>
                <input
                  type="text"
                  value={cardData.stats?.whip || ''}
                  onChange={(e) => handleStatsChange('whip', e.target.value)}
                  placeholder="1.20"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'featured' && (
          <div className="editor-section">
            <h3>Featured Stats</h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Choose up to 3 statistics to display on the front of your card. These stats will be prominently featured.
            </p>

            <div className="featured-stats-grid">
              {Object.entries(cardData.stats || {}).map(([key, value]) => {
                if (!value) return null;

                const isSelected = featuredStats.includes(key);
                const canSelect = featuredStats.length < 3 || isSelected;

                const statLabels = {
                  avg: 'Batting Average',
                  hr: 'Home Runs',
                  rbi: 'RBI',
                  games: 'Games',
                  hits: 'Hits',
                  sb: 'Stolen Bases',
                  atBats: 'At Bats',
                  doubles: 'Doubles',
                  triples: 'Triples',
                  walks: 'Walks',
                  strikeouts: 'Strikeouts',
                  obp: 'On-Base %',
                  slg: 'Slugging %',
                  era: 'ERA',
                  wins: 'Wins',
                  losses: 'Losses',
                  saves: 'Saves',
                  ip: 'Innings Pitched',
                  strikeoutsP: 'Strikeouts (P)',
                  whip: 'WHIP'
                };

                return (
                  <div
                    key={key}
                    className={`featured-stat-item ${isSelected ? 'selected' : ''} ${!canSelect ? 'disabled' : ''}`}
                    onClick={() => {
                      if (isSelected) {
                        setFeaturedStats(prev => prev.filter(s => s !== key));
                      } else if (canSelect) {
                        setFeaturedStats(prev => [...prev, key]);
                      }
                    }}
                  >
                    <div className="stat-checkbox">
                      {isSelected && '✓'}
                    </div>
                    <div className="stat-info">
                      <div className="stat-label">{statLabels[key]}</div>
                      <div className="stat-value">{value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {featuredStats.length === 0 && (
              <p style={{ color: '#9ca3af', marginTop: '1rem', fontStyle: 'italic' }}>
                No stats selected. Click on stats above to feature them on the front of your card.
              </p>
            )}

            {featuredStats.length > 0 && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }}>
                <strong>Selected ({featuredStats.length}/3):</strong>
                <div style={{ marginTop: '0.5rem' }}>
                  {featuredStats.map(key => (
                    <span
                      key={key}
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        margin: '0.25rem',
                        background: '#10b981',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '0.875rem'
                      }}
                    >
                      {key.toUpperCase()}: {cardData.stats[key]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardEditor;
