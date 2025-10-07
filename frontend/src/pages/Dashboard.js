import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('https://ballcard.me/api/cards');
      setCards(response.data.cards || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast.error('Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cardId) => {
    if (!window.confirm('Are you sure you want to delete this card?')) {
      return;
    }

    try {
      await axios.delete(`https://ballcard.me/api/cards/${cardId}`);
      setCards(cards.filter(card => card._id !== cardId));
      toast.success('Card deleted successfully');
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Failed to delete card');
    }
  };

  const handleDownload = async (card) => {
    try {
      // Fetch full card data with imageData and backImageData
      const response = await axios.get(`https://ballcard.me/api/cards/${card._id}`);
      const fullCard = response.data.card;

      if (!fullCard.imageData || !fullCard.backImageData) {
        toast.error('Image data not available');
        return;
      }

      // Download FRONT
      const frontLink = document.createElement('a');
      frontLink.href = fullCard.imageData;
      frontLink.download = `${card.title || 'baseball_card'}_front.jpg`;
      document.body.appendChild(frontLink);
      frontLink.click();
      document.body.removeChild(frontLink);

      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 200));

      // Download BACK
      const backLink = document.createElement('a');
      backLink.href = fullCard.backImageData;
      backLink.download = `${card.title || 'baseball_card'}_back.jpg`;
      document.body.appendChild(backLink);
      backLink.click();
      document.body.removeChild(backLink);

      toast.success('Front and back downloaded!');
    } catch (error) {
      console.error('Error downloading card:', error);
      toast.error('Failed to download card');
    }
  };

  const handleDownloadGif = async (card) => {
    try {
      // Fetch full card data with animatedGif
      const response = await axios.get(`https://ballcard.me/api/cards/${card._id}`);
      const fullCard = response.data.card;

      if (!fullCard.animatedGif) {
        toast.error('Animated GIF not available for this card');
        return;
      }

      // Download animated GIF
      const link = document.createElement('a');
      link.href = fullCard.animatedGif;
      link.download = `${card.title || 'baseball_card'}_animated.gif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Animated GIF downloaded!');
    } catch (error) {
      console.error('Error downloading animated GIF:', error);
      toast.error('Failed to download animated GIF');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your cards...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Baseball Cards</h1>
        <button className="btn-create" onClick={() => navigate('/creator')}>
          ➕ Create New Card
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⚾</div>
          <h2>No cards yet</h2>
          <p>Create your first baseball card to get started!</p>
          <button className="btn-create-large" onClick={() => navigate('/creator')}>
            Create Your First Card
          </button>
        </div>
      ) : (
        <div className="cards-grid">
          {cards.map((card) => (
            <div key={card._id} className="card-item">
              <div className="card-preview">
                {card.thumbnail && (
                  <img src={card.thumbnail} alt={card.title} />
                )}
                {!card.thumbnail && (
                  <div className="no-preview">⚾ No Preview</div>
                )}
              </div>
              <div className="card-details">
                <h3>{card.title}</h3>
                <p className="card-template">{card.template}</p>
                <p className="card-date">
                  {new Date(card.createdAt).toLocaleDateString()}
                </p>
                <div className="card-actions">
                  <button
                    className="btn-download"
                    onClick={() => handleDownload(card)}
                  >
                    📥 Images
                  </button>
                  <button
                    className="btn-download"
                    onClick={() => handleDownloadGif(card)}
                  >
                    🎬 GIF
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(card._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
