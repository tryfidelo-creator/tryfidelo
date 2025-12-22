import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, DollarSign, Check, X, Ban, MoreVertical, Search, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const conversations = [
  { id: '1', name: 'John Seller', avatar: 'https://i.pravatar.cc/150?u=john', lastMessage: 'I can do $800', time: '10 min ago', unread: 2, type: 'marketplace', itemTitle: 'iPhone 13 Pro', status: 'online' },
  { id: '2', name: 'Sarah Cleaner', avatar: 'https://i.pravatar.cc/150?u=sarah', lastMessage: 'I\'ll be there at 2 PM', time: '1 hour ago', unread: 0, type: 'service', itemTitle: 'House Cleaning', status: 'offline' },
  { id: '3', name: 'Mike Rider', avatar: 'https://i.pravatar.cc/150?u=mike', lastMessage: 'Picked up the parcel', time: '2 hours ago', unread: 1, type: 'delivery', itemTitle: 'Parcel Delivery', status: 'online' },
];

const mockMessages = [
  { id: '1', senderId: '2', content: 'Hi! I\'m interested in your iPhone', timestamp: '10:30 AM', type: 'text' },
  { id: '2', senderId: '1', content: 'Great! The listed price is $850', timestamp: '10:32 AM', type: 'text' },
  { id: '3', senderId: '2', content: 'Can you do $750?', timestamp: '10:35 AM', type: 'price_offer', priceOffer: 750 },
  { id: '4', senderId: '1', content: 'How about $800? That\'s my best price', timestamp: '10:38 AM', type: 'price_offer', priceOffer: 800 },
  { id: '5', senderId: '2', content: 'Deal! $800 it is', timestamp: '10:40 AM', type: 'text' },
];

export function MessagesPage() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [message, setMessage] = useState('');
  const [priceOffer, setPriceOffer] = useState('');
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [agreedPrice, setAgreedPrice] = useState<number | null>(800);
  const [showAgreedPriceModal, setShowAgreedPriceModal] = useState(false);
  const [agreedPriceInput, setAgreedPriceInput] = useState(agreedPrice?.toString() || '');
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [selectedBlockReason, setSelectedBlockReason] = useState('');

  const blockReasons = [
    'Spam or scam',
    'Inappropriate content',
    'Harassment or bullying',
    'Offensive behavior',
    "Don't want to see their items",
    'Other',
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Send message via API
      setMessage('');
    }
  };

  const handleSendPriceOffer = () => {
    if (priceOffer) {
      // TODO: Send price offer via API
      setPriceOffer('');
      setShowPriceInput(false);
    }
  };

  const handleSetAgreedPrice = () => {
    const newPrice = parseFloat(agreedPriceInput);
    if (isNaN(newPrice) || newPrice <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    setAgreedPrice(newPrice);
    setShowAgreedPriceModal(false);
    toast.success(`Agreed price set to ₦${newPrice.toLocaleString()}`);
  };

  const handleViewProfile = () => {
    navigate(`/messages/${selectedConversation.id}/profile`);
  };

  const handleBlockUser = () => {
    if (!selectedBlockReason) {
      toast.error('Please select a reason');
      return;
    }
    setIsBlockDialogOpen(false);
    setSelectedBlockReason('');
    toast.success(`${selectedConversation.name} has been blocked`);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.itemTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto px-0 lg:px-4 py-0 lg:py-8 h-[calc(100vh-120px)] lg:h-auto">
        <div className="hidden lg:block mb-6 px-4">
          <h1 className="heading-xl mb-2">Messages</h1>
          <p className="text-gray-600">Chat and negotiate with buyers, sellers, and service providers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6 h-full lg:h-auto">
          {/* Conversations List - Desktop */}
          <Card className="hidden lg:flex lg:col-span-1 overflow-hidden border-0 lg:border shadow-none lg:shadow-sm flex-col">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    className={`p-4 cursor-pointer border-b transition-colors ${
                      selectedConversation.id === conv.id ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conv.avatar} alt={conv.name} />
                          <AvatarFallback>{conv.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          conv.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold truncate">{conv.name}</h4>
                          {conv.unread > 0 && (
                            <Badge className="bg-brand-red h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate mb-1">{conv.itemTitle}</p>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">{conv.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-600">
                  <p>No conversations found</p>
                </div>
              )}
            </div>
          </Card>

          {/* Mobile Conversations List */}
          <AnimatePresence>
            {showMobileChat === false && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="lg:hidden col-span-1 bg-white flex flex-col"
              >
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Messages</h2>
                </div>
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => {
                        setSelectedConversation(conv);
                        setShowMobileChat(true);
                      }}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                        selectedConversation.id === conv.id ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={conv.avatar} alt={conv.name} />
                          <AvatarFallback>{conv.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold truncate">{conv.name}</h4>
                            {conv.unread > 0 && (
                              <Badge className="bg-brand-red">{conv.unread}</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate mb-1">{conv.itemTitle}</p>
                          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area */}
          <AnimatePresence>
            {showMobileChat && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="lg:hidden col-span-1 bg-white flex flex-col"
              >
                {/* Chat Header */}
                <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <button
                      aria-label="Go back"
                      onClick={() => setShowMobileChat(false)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg mr-2"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                          <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                          selectedConversation.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{selectedConversation.name}</h3>
                        <p className="text-xs text-gray-600">{selectedConversation.itemTitle}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setAgreedPriceInput(agreedPrice?.toString() || '');
                        setShowAgreedPriceModal(true);
                      }}
                      className="border-yellow-400 text-yellow-600 hover:bg-yellow-50 text-xs"
                    >
                      <DollarSign className="h-3 w-3 mr-1" />
                      Set Price
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleViewProfile}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsBlockDialogOpen(true)} className="text-red-600">Block User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {mockMessages.map((msg) => {
                    const isSent = msg.senderId === '1';
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%]`}>
                          {msg.type === 'price_offer' ? (
                            <div className={`p-4 rounded-lg ${
                              isSent ? 'bg-brand-yellow text-black' : 'bg-gray-200 text-gray-900'
                            }`}>
                              <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-4 w-4" />
                                <span className="font-semibold text-sm">Price Offer</span>
                              </div>
                              <p className="text-lg font-bold">₦{msg.priceOffer?.toLocaleString()}</p>
                            </div>
                          ) : (
                            <div className={`p-3 rounded-lg ${
                              isSent ? 'bg-black text-white' : 'bg-gray-100'
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t bg-gray-50">
                  {showPriceInput && (
                    <div className="flex gap-2 mb-3">
                      <Input
                        type="number"
                        value={priceOffer}
                        onChange={(e) => setPriceOffer(e.target.value)}
                        placeholder="Enter price"
                        className="flex-1 text-sm"
                      />
                      <Button size="sm" onClick={handleSendPriceOffer} className="bg-brand-yellow text-black hover:bg-brand-orange">
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setShowPriceInput(false)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="bg-black hover:bg-gray-800" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  {!agreedPrice && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPriceInput(!showPriceInput)}
                      className="w-full mt-3 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black"
                    >
                      <DollarSign className="h-3 w-3 mr-1" />
                      Send Price Offer
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Chat Area */}
          <Card className="hidden lg:flex lg:col-span-2 flex-col border-0 shadow-sm">
            {/* Chat Header */}
            <div className="p-4 lg:p-6 border-b bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                      <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      selectedConversation.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedConversation.name}</h3>
                    <p className="text-sm text-gray-600">{selectedConversation.itemTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {agreedPrice && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Badge className="bg-green-100 text-green-800 cursor-pointer hover:bg-green-200" onClick={() => setShowAgreedPriceModal(true)}>
                        <Check className="h-3 w-3 mr-1" />
                        Agreed: ₦{agreedPrice.toLocaleString()}
                      </Badge>
                    </motion.div>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setAgreedPriceInput(agreedPrice?.toString() || '');
                      setShowAgreedPriceModal(true);
                    }}
                    className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Set Price
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleViewProfile}>View Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsBlockDialogOpen(true)} className="text-red-600">Block User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {mockMessages.map((msg) => {
                const isSent = msg.senderId === '1';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[60%]`}>
                      {msg.type === 'price_offer' ? (
                        <div className={`p-4 rounded-lg ${
                          isSent ? 'bg-brand-yellow text-black' : 'bg-gray-100'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-semibold">Price Offer</span>
                          </div>
                          <p className="text-2xl font-bold">₦{msg.priceOffer?.toLocaleString()}</p>
                        </div>
                      ) : (
                        <div className={`p-4 rounded-lg ${
                          isSent ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p>{msg.content}</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">{msg.timestamp}</p>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>

            <Separator />

            {/* Input Area */}
            <div className="p-6 space-y-4 bg-gray-50">
              {!agreedPrice && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPriceInput(!showPriceInput)}
                  className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Send Price Offer
                </Button>
              )}

              {showPriceInput && (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={priceOffer}
                    onChange={(e) => setPriceOffer(e.target.value)}
                    placeholder="Enter your price offer"
                    className="flex-1"
                  />
                  <Button onClick={handleSendPriceOffer} className="bg-brand-yellow text-black hover:bg-brand-orange px-4">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setShowPriceInput(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-black hover:bg-gray-800">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Set Agreed Price Modal */}
        <Dialog open={showAgreedPriceModal} onOpenChange={setShowAgreedPriceModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Agreed Price</DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-600">
                Set the agreed price with {selectedConversation.name} for the {selectedConversation.itemTitle}
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦)</label>
                <Input
                  type="number"
                  value={agreedPriceInput}
                  onChange={(e) => setAgreedPriceInput(e.target.value)}
                  placeholder="Enter agreed price"
                  className="text-lg"
                  min="0"
                />
              </div>
              {agreedPrice && (
                <p className="text-xs text-gray-600">
                  Current agreed price: ₦{agreedPrice.toLocaleString()}
                </p>
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAgreedPriceModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white flex-1"
                  onClick={handleSetAgreedPrice}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Set Price
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Block User Dialog */}
        <AlertDialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Block {selectedConversation.name}?</AlertDialogTitle>
              <AlertDialogDescription>
                You won't see messages or listings from this user. You can unblock them later in your settings.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">
                Reason for blocking (optional)
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {blockReasons.map((reason) => (
                  <label
                    key={reason}
                    className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="blockReason"
                      value={reason}
                      checked={selectedBlockReason === reason}
                      onChange={(e) => setSelectedBlockReason(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleBlockUser}
                className="bg-red-600 hover:bg-red-700"
              >
                <Ban className="h-4 w-4 mr-2" />
                Block User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}