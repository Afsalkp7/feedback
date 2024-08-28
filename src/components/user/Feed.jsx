import { useState, useEffect } from "react";
import { FaHandPointRight } from "react-icons/fa";

function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [filteredFeeds, setFilteredFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [responses, setResponses] = useState({});
  const [userFeedbacks, setUserFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://feedback-backend-ochre.vercel.app/api/feed/feeds",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch feeds");
        }
        const data = await response.json();
        setFeeds(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchUserFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://feedback-backend-ochre.vercel.app/api/feed/user/feedback",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user feedbacks");
        }
        const data = await response.json();
        // Assuming data is an array of feedback IDs
        console.log(data);

        setUserFeedbacks(data.feedbackIds); // Adjust if the structure is different
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFeeds();
    fetchUserFeedbacks();
  }, []);

  useEffect(() => {
    // Filter feeds based on user feedbacks
    if (feeds.length && userFeedbacks.length) {
        console.log("userFeedback",userFeedbacks);
        console.log("feeds",feeds);
        
        
        const filtered = feeds.filter(feed => 
            !userFeedbacks.includes(feed.feedbackFormId)
          );
          console.log(filtered);
          

      setFilteredFeeds(filtered);
    } else {
      setFilteredFeeds(feeds);
    }
  }, [feeds, userFeedbacks]);

  const handleRespondClick = (feed) => {
    setSelectedFeed(feed);
    setResponses({}); // Reset responses when a new form is selected
  };

  const handleResponseChange = (e, fieldId) => {
    setResponses({
      ...responses,
      [fieldId]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://feedback-backend-ochre.vercel.app/api/feed/review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            feedbackFormId: selectedFeed.feedbackFormId,
            responses: Object.entries(responses).map(([fieldId, response]) => ({
              [fieldId]: response,
            })),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit responses");
      }
      setFilteredFeeds(filteredFeeds.filter(feed => feed.feedbackFormId !== selectedFeed.feedbackFormId));
      setSelectedFeed(null);
    } catch (err) {
      console.error("Error submitting responses:", err.message);
      alert("Failed to submit responses");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center items-center px-4 sm:px-10 md:px-20 lg:px-40 flex-wrap gap-2 pt-16 z-0">
      {filteredFeeds.map((feed, index) => (
        <div
          key={index}
          className="cursor-pointer shadow-lg h-[200px] w-[200px] mt-10 bg-black rounded-lg relative text-slate-100"
        >
          <div className="flex items-center ms-6 mt-2 min-h-16">
            <FaHandPointRight className="mr-2 text-xl" />
            <h3 className="font-bold">{feed.title}</h3>
          </div>
          <button
            onClick={() => handleRespondClick(feed)}
            className="absolute bottom-2 right-2 px-4 py-2 bg-slate-100 text-black rounded-lg"
          >
            Respond
          </button>
        </div>
      ))}

      {selectedFeed && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 sm:w-1/2">
            <h2 className="text-xl font-bold mb-4">{selectedFeed.title}</h2>
            <form>
              {selectedFeed.fields && selectedFeed.fields.length > 0 ? (
                selectedFeed.fields.map((field) => (
                  <div key={field.field_id} className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      {field.label}
                    </label>
                    {field.fieldType === "TextArea" && (
                      <textarea
                        className="w-full border border-gray-300 p-2 rounded"
                        rows="4"
                        value={responses[field.field_id] || ""}
                        onChange={(e) =>
                          handleResponseChange(e, field.field_id)
                        }
                      />
                    )}
                    {field.fieldType === "SingleLineInput" && (
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={responses[field.field_id] || ""}
                        onChange={(e) =>
                          handleResponseChange(e, field.field_id)
                        }
                      />
                    )}
                    {field.fieldType === "NumericalRating" && (
                      <input
                        type="number"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={responses[field.field_id] || ""}
                        onChange={(e) =>
                          handleResponseChange(e, field.field_id)
                        }
                      />
                    )}
                    {field.fieldType === "StarRating" && (
                      <input
                        type="number"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={responses[field.field_id] || ""}
                        onChange={(e) =>
                          handleResponseChange(e, field.field_id)
                        }
                      />
                    )}
                    {field.fieldType === "SmileRating" && (
                      <input
                        type="number"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={responses[field.field_id] || ""}
                        onChange={(e) =>
                          handleResponseChange(e, field.field_id)
                        }
                      />
                    )}
                    {field.fieldType === "RadioButtons" && (
                      <div>
                        {field.options.map((option, idx) => (
                          <div key={idx} className="flex items-center mb-2">
                            <input
                              type="radio"
                              id={`${field.field_id}-${idx}`}
                              name={field.field_id}
                              value={option}
                              checked={responses[field.field_id] === option}
                              onChange={(e) =>
                                handleResponseChange(e, field.field_id)
                              }
                              className="mr-2"
                            />
                            <label
                              htmlFor={`${field.field_id}-${idx}`}
                              className="text-sm"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No fields available to respond to</p>
              )}
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setSelectedFeed(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg ml-4"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
