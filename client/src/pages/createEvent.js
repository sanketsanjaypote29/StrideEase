import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Stepper, Step } from "@material-tailwind/react";
import MapPicker from "react-google-map-picker";
import axios from "axios";
import { FaMapMarkedAlt } from "react-icons/fa";

const defaultPosition = {
  lat: 18.5204,
  lng: 73.8567,
};
const CreateEvent = () => {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showImageUploadForm, setShowImageUploadForm] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [organiserFormData, setOrganiserFormData] = useState({
    organiserName: "",
    country: "",
    state: "",
    individualOrCompany: "",
  });
  const [venueAddress, setVenueAddress] = useState("");
  const [address, setAddress] = useState("Pune Maharashtra,India");
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  const [city, setCityName] = useState("");

  const steps = [
    "Organizer",
    "Event Venu",
    "Description",
    "Image Upload",
    "Ticket",
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleData();
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  const handleNextButtonClick = () => {
    setShowDescription(true);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);
      setShowImageUploadForm(false);
      setShowTicketForm(true);
    }
  };

  const handleSubmitDescription = (e) => {
    e.preventDefault();
    setShowDescription(false);
    setShowImageUploadForm(true); // Update to show the image upload form
  };

  const handleBackToImageUpload = () => {
    setShowDescription(true);
    setShowTicketForm(false);
    setShowImageUploadForm(true);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleData = () => {
    // Collect and submit all form data here
    const allFormData = {
      ...organiserFormData,
      textAreaValue: textAreaValue,
      imageFiles: imageFiles,
    };
    console.log("All Form Data:", allFormData);
    // Perform submission logic here
  };

  const handleOrganiserFormChange = (e) => {
    const { name, value } = e.target;
    setOrganiserFormData({
      ...organiserFormData,
      [name]: value,
    });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const [location, setLocation] = useState(defaultPosition);
  const [zoom, setZoom] = useState(10);
  const handleLocationChange = (lat, lng) => {
    setLocation({ lat: lat, lng: lng });
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };
  useEffect(() => {
    // Perform reverse geocoding here
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyAcyLx7lr6FJDrQYzv6f5tJP8m8q1UjO6E`
      )
      .then((response) => {
        const results = response.data.results;
        if (results && results.length > 0) {
          const formattedAddress = results[0].formatted_address;
          setCityName(formattedAddress);
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  }, [location]);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-80 p-4">
          <Stepper
            activeStep={activeStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}>
            {steps.map((step, index) => (
              <Step key={index} onClick={() => setActiveStep(index)}>
                {step}
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="w-1/2 p-4 bg-amber-50 border h-auto left-96 mb-80 rounded-2xl">
          <form onSubmit={(e) => e.preventDefault()}>
            {activeStep === 0 && (
              <div>
                <div className="mb-4">
                  <div className="flex mb-2 items-center">
                    <label className="font-bold text-gray-800 mr-1">
                      Enter
                    </label>
                    <label className="block text-gray-600 text-sm font-bold">
                      Organiser's Name
                    </label>
                  </div>
                  <input
                    type="text"
                    name="organiserName"
                    value={organiserFormData.organiserName}
                    onChange={handleOrganiserFormChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Organiser name"
                    required="true"
                  />
                </div>
                <div className="mb-4">
                  <div className="flex mb-2 items-center">
                    <label className="font-bold text-gray-800 mr-1">
                      Enter
                    </label>
                    <label className="block text-gray-600 text-sm font-bold">
                      Country
                    </label>
                  </div>
                  <select
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue=""
                    required="true">
                    <option value="" disabled>
                      Select country
                    </option>
                    <option value="option1">India</option>
                  </select>
                </div>
                <div className="mb-4">
                  <div className="flex mb-2 items-center">
                    <label className="font-bold text-gray-800 mr-1">
                      Enter
                    </label>
                    <label className="block text-gray-600 text-sm font-bold">
                      State
                    </label>
                  </div>
                  <select
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue=""
                    required="true">
                    <option value="" disabled>
                      Select a state
                    </option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
                <div className="mb-4 flex justify-start ml-10 mt-8">
                  <label className="block text-gray-700 text-sm font-bold mb-2 mr-10">
                    I am an Individual
                    <input
                      type="radio"
                      name="radioOption"
                      className="ml-2"
                      required
                    />
                  </label>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    We are a Company
                    <input
                      type="radio"
                      name="radioOption"
                      className="ml-2"
                      required
                    />
                  </label>
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <div>
                {/* Description */}
                <div className="h-2/5 mb-20">
                  <div className="flex mb-2 items-center">
                    <label className="font-bold text-gray-800 mr-1">
                      Event
                    </label>
                    <label className="block text-gray-600 text-sm font-bold">
                      Venue Address
                    </label>
                  </div>
                  <div className=" mb-4">
                    <div className="flex mb-4">
                      <input
                        type="text"
                        className="appearance-none border rounded w-8/12 py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        placeholder="Enter Venu Address"
                      />
                      <div
                        style={{ display: "flex", alignItems: "center" }}
                        className="ml-4 border pl-2 pr-2">
                        <FaMapMarkedAlt style={{ marginRight: "5px" }} />
                        <div className="text-black font-bold">Use Map</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex flex-col w-full">
                      <label className="appearance-none border rounded w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline mb-2">
                        Address: {city}
                      </label>
                      <div className="mb-5">
                        {/* LocationPickerExample component */}
                        <MapPicker
                          defaultLocation={defaultPosition}
                          mapTypeId="roadmap"
                          style={{ height: "350px" }}
                          onChangeLocation={handleLocationChange}
                          onChangeZoom={handleZoomChange}
                          apiKey="AIzaSyAcyLx7lr6FJDrQYzv6f5tJP8m8q1UjO6E"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div>
                {/* Description */}
                <div className="  h-80 mb-20">
                  <div className="flex mb-2 items-center">
                    <label className="font-bold text-gray-800 mr-1">
                      Upload
                    </label>
                    <label className="block text-gray-600 text-sm font-bold">
                      Images
                    </label>
                  </div>
                  <div className="bg-white h-80 m-5 mb-10 flex justify-center items-center">
                    <div>
                      <label className="block text-gray-600 text-sm font-demiboldmb-2">
                        Upload Cover Picture For The Event You are Organizing
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                        required
                        className="justify-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div>
                <div className="flex mb-2 items-center">
                  <label className="font-bold text-gray-800 mr-1">Enter</label>
                  <label className="block text-gray-600 text-sm font-bold">
                    Description
                  </label>
                </div>
                <div className="mb-4">
                  <textarea
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight h-80 focus:outline-none focus:shadow-outline"
                    placeholder="Enter your description"
                    required
                  />
                </div>
              </div>
            )}
            {activeStep === 4 && (
              <div>
                <div className="flex mb-2 items-center">
                  <label className="font-bold text-black mr-1">Ticket</label>
                  <label className="block text-gray-500 text-sm font-bold">
                    Name
                  </label>
                </div>

                <div className="flex mb-4">
                  <input
                    type="text"
                    className="appearance-none border rounded w-8/12 py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    placeholder="Enter ticket name "
                  />
                </div>
                <div className="mb-5">
                  <div className="flex mb-2 items-center">
                    <label className="font-bold text-black mr-1">Ticket</label>
                    <label className="block text-gray-500 text-sm font-bold">
                      Type
                    </label>
                  </div>
                  <button className="bg-amber-50 hover:bg-stone-500 hover:text-white text-black border font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                    Paid
                  </button>
                  <button className="bg-amber-50 hover:bg-stone-500 hover:text-white border text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                    Free
                  </button>
                  <button className="bg-amber-50 hover:bg-stone-500 hover:text-white border  text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Donation
                  </button>
                </div>

                {/* Second row */}

                <div className="flex mb-4">
                  <div className="flex flex-col w-full">
                    {/* Wrap second input field and label in a div with flex direction column */}
                    <div className="flex mb-2 items-center">
                      <label className="font-bold text-black mr-1">Total</label>
                      <label className="block text-gray-500 text-sm font-bold">
                        Slots For Event
                      </label>
                    </div>
                    {/* Move the label above the input field */}
                    <input
                      type="text"
                      className="appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Input Field 2"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex mb-2 items-center">
                      <label className="font-bold text-black mr-1">
                        Ticket
                      </label>
                      <label className="block text-gray-500 text-sm font-bold">
                        Price
                      </label>
                    </div>
                    {/* Move the label above the input field */}
                    <input
                      type="text"
                      className="appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Input Field 2"
                    />
                  </div>
                </div>

                {/* Third row */}
                <div className="mb-4 h-20">
                  <div className="mt-8 bg-amber-50 w-full h-auto left-96 rounded-2xl">
                    <div className="flex mb-4">
                      <div className="flex flex-col mr-20">
                        <div className="flex mb-2 items-center">
                          <label className="font-bold text-black mr-1">
                            Ticket
                          </label>
                          <label className="block text-gray-500 text-sm font-bold">
                            Sale end on
                          </label>
                        </div>
                        <div className="flex">
                          <FaRegCalendarAlt className="mt-1 text-xl mr-2" />
                          <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            className="mr-2 border"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col ">
                        <div className="flex mb-2 items-center">
                          <label className="font-bold text-black mr-1">
                            Ticket
                          </label>
                          <label className="block text-gray-500 text-sm font-bold">
                            Sale end on
                          </label>
                        </div>

                        <div className="flex">
                          <FaRegCalendarAlt className="mt-1 text-xl mr-2" />
                          <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            className="mr-2 border"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end m-5">
              {activeStep !== 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-amber-50 hover:bg-red-400  hover:text-white text-black border font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mr-2">
                  Back
                </button>
              )}
              <button
                type="submit"
                onClick={handleNext}
                className="bg-amber-50 hover:bg-blue-500  hover:text-white text-black border font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateEvent;
