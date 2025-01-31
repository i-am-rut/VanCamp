import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddHostVan = () => {
    const [van, setVan] = useState({
        name: '',
        description: '',
        basePrice: '',
        location: '',
        category: '',
        images: [],
        hostId: '',
    });
    const [done, setDone] = useState(false);
    const [message, setMessage] = useState('');
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    
    
    useEffect(() => {
        const validateForm = () => {
            const { name, description, basePrice, location, category, hostId, images } = van;
            if (name && description && basePrice && location && category && hostId && images.length > 0) {
                setDone(true);
            } else {
                setDone(false);
                setMessage('All fields are mandatory');
            }
        };
        validateForm();
      }, [van]); 
    
      const handleFormInput = (e) => {
        const { name, value } = e.target;
        setVan((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
    const handleFormFiles = (e) => {
        const files = e.target.files;
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        // Check if number of files exceeds the limit
        if (files.length > 5) {
            setMessage('You can only upload up to 5 images.');
            return;
        }
        
        // Validate file types
        for (let i = 0; i < files.length; i++) {
            if (!validTypes.includes(files[i].type)) {
                setMessage('Only .jpg, .jpeg, and .png files are allowed.');
                return;
            }
        }
        
        setMessage(''); // Clear error message if files are valid
        
        // Update state for images and show previews
        setVan((prev) => ({
            ...prev,
            images: Array.from(files), // Store the selected files
        }));
        
        // Generate image previews
        const previews = Array.from(files).map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };
    
    
    const handleAddVan = async (e) => {
        e.preventDefault();
        
        if(isSubmitting) return

        setIsSubmitting(true)
        setLoading(true)
        // Create FormData to send the data along with images
        const formData = new FormData();
        formData.append('hostId', van.hostId);
        formData.append('name', van.name);
        formData.append('description', van.description);
        formData.append('basePrice', van.basePrice);
        formData.append('location', van.location);
        formData.append('category', van.category);

        // Append images to FormData
        for (let i = 0; i < van.images.length; i++) {
            formData.append('images', van.images[i]);
        }
        
        try {
            const response = await fetch('https://vancamp-backend.onrender.com/api/vans/create', {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error creating van');
            }
            
            const data = await response.json();
            setMessage(`${data.name}an added successfully`);
            setTimeout(() => {
                navigate('/host/vans')
            })
            
        } catch (error) {
            console.error('Error adding van:', error);
            setMessage(error.message); // Set the error message to show to the user
        } finally {
            setDone(false)
            setVan({
                name: '',
                description: '',
                basePrice: '',
                location: '',
                category: '',
                images: [],
                hostId: '',
            })
            setImagePreviews([])
            setIsSubmitting(false)
            setLoading(false)
        }

    };
    
    return (
        <div 
            className="Add-host-van-form-page-container"
            style={{ cursor: loading ? 'wait' : 'default' }}>
            <h1>Add new van</h1>
            <form>
                <label htmlFor='add-van-host-id'>Host id:</label>
                <input
                    id="add-van-host-id"
                    name="hostId"
                    value={van.hostId}
                    onChange={handleFormInput}
                    placeholder="HostId"
                />
                <label htmlFor='add-van-name'>Van name:</label>
                <input
                    id="add-van-name"
                    name="name"
                    value={van.name}
                    onChange={handleFormInput}
                    placeholder="Van name"
                />
                <label htmlFor='add-van-description'>Van description:</label>
                <input
                    id="add-van-description"
                    name="description"
                    value={van.description}
                    onChange={handleFormInput}
                    placeholder="Van description"
                />
                <label htmlFor='add-van-location'>City:</label>
                <input
                    id="add-van-location"
                    name="location"
                    value={van.location}
                    onChange={handleFormInput}
                    placeholder="Location (city)"
                />
                <label htmlFor='add-van-price'>Price (per day):</label>
                <input
                    id="add-van-price"
                    name="basePrice"
                    value={van.basePrice}
                    onChange={handleFormInput}
                    placeholder="Van price per day"
                />
                <label htmlFor='add-van-category'>Category:</label>
                <select id='add-van-category' name="category" value={van.category} onChange={handleFormInput}>
                    <option value="">--Select Van Category--</option>
                    <option value="simple">Simple</option>
                    <option value="rugged">Rugged</option>
                    <option value="luxury">Luxury</option>
                </select>
                <div className='add-van-upload-image-and-label-container'>
                    <label htmlFor='add-van-images'>{`Add upto 5 images of ${van.name? van.name : 'van'}:`}</label>
                    <input
                        id='add-van-images'
                        type="file"
                        name="images"
                        accept=".jpg, .jpeg, .png"
                        multiple
                        className='add-van-upload-images'
                        onChange={handleFormFiles}
                    />
                </div>
                <div className="image-previews">
                    {imagePreviews.length > 0 &&
                        imagePreviews.map((preview, index) => (
                            <img key={index} src={preview} alt={`preview-${index}`} width={100} height={100} />
                        ))}
                </div>
                {message && <p style={{ color: 'red' }}>{message}</p>}

                <button 
                    type="submit" 
                    className='add-van-button'
                    disabled={!done || isSubmitting} 
                    onClick={handleAddVan}>Add Van</button>
            </form>
        </div>
    );
};

export default AddHostVan;
