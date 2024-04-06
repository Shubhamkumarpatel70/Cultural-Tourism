import React, { useState } from 'react';

export default function HotelRegister() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    facilities: [],
    rating: '',
    contact: '',
    newFacility: '',
    hotelImages: [],
    roomImages: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prevState => ({
          ...prevState,
          facilities: [...prevState.facilities, value]
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          facilities: prevState.facilities.filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleAddFacility = () => {
    const { newFacility } = formData;
    if (newFacility && !formData.facilities.includes(newFacility)) {
      setFormData(prevState => ({
        ...prevState,
        facilities: [...prevState.facilities, newFacility],
        newFacility: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevState => ({
      ...prevState,
      hotelImages: [...prevState.hotelImages, ...files]
    }));
  };

  const handleRoomImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevState => ({
      ...prevState,
      roomImages: [...prevState.roomImages, ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: '',
      location: '',
      description: '',
      facilities: [],
      rating: '',
      contact: '',
      newFacility: '',
      hotelImages: [],
      roomImages: []
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="h-[105vh] w-[800px] pl-3 space-y-8 border-2">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register Your Hotel</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Hotel Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Hotel Name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="hotelImages" className="block text-sm font-medium text-gray-700">Upload Hotel Images</label>
              <input
                id="hotelImages"
                name="hotelImages"
                type="file"
                multiple
                onChange={handleImageUpload}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="roomImages" className="block text-sm font-medium text-gray-700">Upload Room Images</label>
              <input
                id="roomImages"
                name="roomImages"
                type="file"
                multiple
                onChange={handleRoomImageUpload}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="newFacility" className="block text-sm font-medium text-gray-700">Add New Facility</label>
              <div className="flex items-center">
                <input
                  id="newFacility"
                  name="newFacility"
                  type="text"
                  value={formData.newFacility}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Add New Facility"
                />
                <button
                  type="button"
                  onClick={handleAddFacility}
                  className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Facilities</label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.facilities.map((facility, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    value={facility}
                    checked={formData.facilities.includes(facility)}
                    onChange={handleChange}
                  />
                  <label className="ml-2 block text-sm text-gray-900">{facility}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Uploaded Hotel Images:</label>
            <div className="flex mt-2">
              {formData.hotelImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Hotel Image ${index + 1}`}
                  className="h-20 w-20 object-cover mr-2"
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Uploaded Room Images:</label>
            <div className="flex mt-2">
              {formData.roomImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Room Image ${index + 1}`}
                  className="h-20 w-20 object-cover mr-2"
                />
              ))}
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
