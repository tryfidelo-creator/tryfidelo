import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/constants/routes';

interface ListingFormData {
  title: string;
  category: string;
  price: number;
  description: string;
  condition: string;
  location: string;
  images: string[];
}

export function CreateListingPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'details' | 'images' | 'preview'>('details');
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    category: '',
    price: 0,
    description: '',
    condition: 'Good',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Listing created successfully!');
      navigate(ROUTES.MY_ADS);
    } catch (error) {
      toast.error('Failed to create listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = {
    details: !!(formData.title && formData.category && formData.price),
    images: formData.images.length > 0,
    preview: true,
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(ROUTES.MY_ADS)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Listing</h1>
            <p className="text-gray-600 mt-1">Add a new product to sell</p>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex gap-4 mb-8">
          {(['details', 'images', 'preview'] as const).map((s, index) => (
            <div key={s} className="flex items-center flex-1">
              <motion.div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step === s
                    ? 'bg-brand-yellow text-black'
                    : index < (['details', 'images', 'preview'] as const).indexOf(step)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}
                animate={{ scale: step === s ? 1.1 : 1 }}
              >
                {index < (['details', 'images', 'preview'] as const).indexOf(step) ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </motion.div>
              <div className={`flex-1 h-1 mx-2 rounded ${
                index < (['details', 'images', 'preview'] as const).indexOf(step)
                  ? 'bg-green-500'
                  : index < (['details', 'images', 'preview'] as const).indexOf(step)
                    ? 'bg-brand-yellow'
                    : 'bg-gray-200'
              }`} />
            </div>
          ))}
        </div>

        {/* Step 1: Details */}
        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Listing Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title <span className="text-red-600">*</span>
                    </label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., iPhone 14 Pro Max"
                      className="text-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.title.length}/100 characters
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-600">*</span>
                      </label>
                      <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
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
                      <Select value={formData.condition} onValueChange={(value) => handleSelectChange('condition', value)}>
                        <SelectTrigger>
                          <SelectValue />
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₦) <span className="text-red-600">*</span>
                      </label>
                      <Input
                        name="price"
                        type="number"
                        value={formData.price || ''}
                        onChange={handleChange}
                        placeholder="0"
                        className="text-lg"
                        min="0"
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
                        placeholder="e.g., Lagos, Nigeria"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your product in detail..."
                      rows={5}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.description.length}/1000 characters
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Images */}
          {step === 'images' && (
            <motion.div
              key="images"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Add Images</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Upload up to 8 images (first image will be the main one)</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-yellow transition">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="font-medium text-gray-900 mb-1">Click to upload images</p>
                    <p className="text-sm text-gray-600 mb-4">or drag and drop</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Button variant="outline">Select Images</Button>
                    </label>
                    <p className="text-xs text-gray-500 mt-3">PNG, JPG, GIF up to 10MB</p>
                  </div>

                  {formData.images.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-medium text-gray-900">
                          Uploaded: {formData.images.length}/8
                        </p>
                        {formData.images.length >= 3 && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Good
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                          >
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            {index === 0 && (
                              <Badge className="absolute top-1 left-1 bg-brand-yellow text-black">
                                Main
                              </Badge>
                            )}
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-lg"
                            >
                              <X className="h-6 w-6 text-white" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Preview */}
          {step === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Listing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Images Preview */}
                    {formData.images.length > 0 && (
                      <div>
                        <img
                          src={formData.images[0]}
                          alt="Main product"
                          className="w-full h-64 object-cover rounded-lg mb-3"
                        />
                        {formData.images.length > 1 && (
                          <div className="grid grid-cols-3 gap-2">
                            {formData.images.slice(1, 4).map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt={`Preview ${i + 2}`}
                                className="w-full h-20 object-cover rounded"
                              />
                            ))}
                            {formData.images.length > 4 && (
                              <div className="w-full h-20 bg-gray-200 rounded flex items-center justify-center text-gray-600 font-medium">
                                +{formData.images.length - 4}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Details Preview */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Title</p>
                        <h2 className="text-2xl font-bold text-gray-900">{formData.title}</h2>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="text-2xl font-bold text-brand-yellow">₦{formData.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Category</p>
                          <Badge className="mt-1">{formData.category}</Badge>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Condition</p>
                        <p className="font-medium text-gray-900">{formData.condition}</p>
                      </div>

                      {formData.location && (
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-medium text-gray-900">{formData.location}</p>
                        </div>
                      )}

                      {formData.description && (
                        <div>
                          <p className="text-sm text-gray-600">Description</p>
                          <p className="text-gray-900">{formData.description}</p>
                        </div>
                      )}

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <p className="text-sm text-blue-800">
                          Your listing will be published immediately. Daily ad fee will be deducted from your wallet.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => {
              if (step === 'details') {
                navigate(ROUTES.MY_ADS);
              } else {
                const steps: ('details' | 'images' | 'preview')[] = ['details', 'images', 'preview'];
                setStep(steps[Math.max(0, steps.indexOf(step) - 1)]);
              }
            }}
          >
            {step === 'details' ? 'Cancel' : 'Back'}
          </Button>

          <Button
            onClick={() => {
              if (step === 'details') {
                if (canProceed.details) setStep('images');
                else toast.error('Please fill in all required fields');
              } else if (step === 'images') {
                if (canProceed.images) setStep('preview');
                else toast.error('Please upload at least one image');
              } else {
                handleSubmit();
              }
            }}
            disabled={isSubmitting}
            className="bg-brand-yellow text-black hover:bg-brand-orange"
          >
            {step === 'preview' ? (isSubmitting ? 'Publishing...' : 'Publish Listing') : 'Next'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
