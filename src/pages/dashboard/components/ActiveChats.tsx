import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';
import { ACTIVE_CHATS } from '../constants';

export function ActiveChats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Active Chats
          </span>
          <Link to={ROUTES.MESSAGES}>
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ACTIVE_CHATS.map((chat) => (
            <div
              key={chat.id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm truncate">{chat.name}</h4>
                  {chat.unread > 0 && (
                    <span className="bg-orange-600 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.message}</p>
                <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
