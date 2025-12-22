import { useState } from 'react';
import { Plus, X, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ListingFormData {
  title: string;
  category: string;
  price: number;
  description: string;
  condition: string;
  location: string;
  images: string[];
}

export function CreateListingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'details' | 'images' | 'preview'>(
    'details'
  );
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    category: '',
    price: 0,
    description: '',
    condition: 'good',
    location: '',
    images: [],
  });

  const categories = [
    'Electronics',
    'Furniture',
    'Fashion',
    'Sports & Outdoors',
    'Home & Garden',
    'Books',
    'Toys & Games',
    'Beauty & Personal Care',
  ];

  const conditions = ['Brand New', 'Like New', 'Good', 'Fair', 'For Parts'];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      if (formData.images.length + newImages.length > 8) {
        toast.error('Maximum 8 images allowed');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
      toast.success(`Added ${newImages.length} image(s)`);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Listing created successfully!');
      setIsOpen(false);
      // Reset form
      setFormData({
        title: '',
        category: '',
        price: 0,
        description: '',
        condition: 'good',
        location: '',
        images: [],
      });
      setStep('details');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    if (step === 'details') {
      return formData.title && formData.category && formData.price > 0;
    }
    if (step === 'images') {
      return formData.images.length > 0;
    }
    return true;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Listing
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Listing</DialogTitle>
          <div className="flex gap-2 mt-4">
            {(['details', 'images', 'preview'] as const).map((s) => (
              <button
                key={s}
                onClick={() => s !== 'preview' && setStep(s)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  step === s
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Details Step */}
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 p-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., iPhone 14 Pro Max"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/100
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange('category', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) =>
                      handleSelectChange('condition', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((cond) => (
                        <SelectItem key={cond} value={cond}>
                          {cond}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₦) *
                  </label>
                  <Input
                    name="price"
                    type="number"
                    value={formData.price || ''}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your item in detail..."
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none h-24"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/500
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  Make sure your title and description are clear and accurate
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={() => setStep('images')}
                  disabled={!isStepValid() || isSubmitting}
                >
                  Next: Add Images
                </Button>
              </div>
            </motion.div>
          )}

          {/* Images Step */}
          {step === 'images' && (
            <motion.div
              key="images"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 p-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images *
                </label>
                <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors bg-gray-50 hover:bg-yellow-50">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB each (Max 8 images)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {formData.images.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Images ({formData.images.length}/8)
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {formData.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative group"
                      >
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">
                  Add at least 2-3 high-quality images for better visibility
                </p>
              </div>

              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep('details')}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => setStep('preview')}
                    disabled={!isStepValid() || isSubmitting}
                  >
                    Preview & Post
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Preview Step */}
          {step === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 p-4"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Images Preview */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Images
                  </p>
                  {formData.images.length > 0 ? (
                    <div className="space-y-2">
                      <img
                        src={formData.images[0]}
                        alt="Main"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {formData.images.length > 1 && (
                        <div className="grid grid-cols-3 gap-2">
                          {formData.images.slice(1, 4).map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`Thumb ${idx}`}
                              className="w-full h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">No images</p>
                    </div>
                  )}
                </div>

                {/* Details Preview */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Category</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formData.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">Title</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formData.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">Price</p>
                    <p className="text-2xl font-bold text-red-600">
                      ₦{formData.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Badge variant="secondary">{formData.condition}</Badge>
                    {formData.location && (
                      <Badge variant="outline">{formData.location}</Badge>
                    )}
                  </div>

                  {formData.description && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Description
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {formData.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  ✓ Review your listing and click Post to make it live
                </p>
              </div>

              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep('images')}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Listing'}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
