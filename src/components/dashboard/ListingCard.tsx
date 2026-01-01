import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ListingItem {
  id: string;
  title: string;
  price: number;
  status: 'active' | 'paused' | 'sold';
  views?: number;
  inquiries?: number;
  image?: string;
  rating?: number;
}

interface ListingCardProps {
  item: ListingItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ListingCard({ item, onEdit, onDelete }: ListingCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-gray-100 text-gray-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all overflow-hidden">
        {item.image && (
          <div className="h-40 bg-gray-200 overflow-hidden relative">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <Badge className={`absolute top-3 right-3 ${statusColors[item.status]}`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
              <p className="text-xl font-bold text-orange-600 mt-1">${item.price}</p>
            </div>
            {item.rating && (
              <div className="flex items-center gap-1 text-sm">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">{item.rating}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {(item.views || item.inquiries) && (
            <div className="flex gap-4 text-sm text-gray-600">
              {item.views !== undefined && (
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{item.views} views</span>
                </div>
              )}
              {item.inquiries !== undefined && (
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{item.inquiries} inquiries</span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-9 text-xs"
              onClick={() => onEdit(item.id)}
            >
              <Edit2 className="w-3 h-3 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-9 text-xs text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
