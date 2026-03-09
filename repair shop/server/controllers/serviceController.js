import Service from '../models/Service.js';
import { uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } from '../utils/cloudinaryHelper.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check if image file is provided
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image'
      });
    }

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, 'samarth-mobile/services');

    // Create service
    const service = await Service.create({
      title,
      description,
      image: result.secure_url
    });

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const { title, description } = req.body;
    let imageUrl = service.image;

    // If new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      const publicId = getPublicIdFromUrl(service.image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }

      // Upload new image
      const result = await uploadToCloudinary(req.file.buffer, 'samarth-mobile/services');
      imageUrl = result.secure_url;
    }

    // Update service
    service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title: title || service.title,
        description: description || service.description,
        image: imageUrl
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Delete image from Cloudinary
    const publicId = getPublicIdFromUrl(service.image);
    if (publicId) {
      await deleteFromCloudinary(publicId);
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
