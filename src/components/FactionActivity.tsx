import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Player {
  id: number;
  name: string;
  rank: string;
  status: 'online' | 'afk' | 'offline';
  lastSeen: string;
  playTime: string;
  avatar?: string;
}

interface Faction {
  id: number;
  name: string;
  type: string;
  color: string;
  members: Player[];
  onlineCount: number;
  totalMembers: number;
}

const FactionActivity = () => {
  const [selectedFaction, setSelectedFaction] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Mock data для демонстрации
  const [factions, setFactions] = useState<Faction[]>([
    {
      id: 1,
      name: "Полиция Майами",
      type: "Государственная",
      color: "blue",
      onlineCount: 12,
      totalMembers: 45,
      members: [
        { id: 1, name: "John_Martinez", rank: "Капитан", status: "online", lastSeen: "Сейчас", playTime: "4ч 32м", avatar: "/placeholder.svg" },
        { id: 2, name: "Maria_Rodriguez", rank: "Лейтенант", status: "afk", lastSeen: "15 мин назад", playTime: "2ч 15м" },
        { id: 3, name: "Carlos_Mendez", rank: "Сержант", status: "online", lastSeen: "Сейчас", playTime: "6ч 42м" },
        { id: 4, name: "Anna_Smith", rank: "Офицер", status: "offline", lastSeen: "1ч 23м назад", playTime: "0ч 0м" },
        { id: 5, name: "Mike_Johnson", rank: "Офицер", status: "online", lastSeen: "Сейчас", playTime: "3ч 18м" }
      ]
    },
    {
      id: 2,
      name: "Мафия Картель",
      type: "Преступная",
      color: "red",
      onlineCount: 8,
      totalMembers: 32,
      members: [
        { id: 6, name: "Tony_Soprano", rank: "Дон", status: "online", lastSeen: "Сейчас", playTime: "5ч 45м" },
        { id: 7, name: "Vincent_Corleone", rank: "Капо", status: "afk", lastSeen: "8 мин назад", playTime: "3ч 22м" },
        { id: 8, name: "Rico_Valdez", rank: "Солдат", status: "offline", lastSeen: "2ч 15м назад", playTime: "0ч 0м" }
      ]
    },
    {
      id: 3,
      name: "Байкеры MC",
      type: "Банда",
      color: "orange",
      onlineCount: 15,
      totalMembers: 28,
      members: [
        { id: 9, name: "Razor_Williams", rank: "Президент", status: "online", lastSeen: "Сейчас", playTime: "7ч 12м" },
        { id: 10, name: "Steel_Martinez", rank: "Вице-президент", status: "online", lastSeen: "Сейчас", playTime: "4ч 38м" }
      ]
    }
  ]);

  // Обновляем время каждую минуту
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const updatePlayerStatus = (playerId: number, newStatus: 'online' | 'afk' | 'offline') => {
    setFactions(prev => prev.map(faction => ({
      ...faction,
      members: faction.members.map(member => 
        member.id === playerId 
          ? { ...member, status: newStatus, lastSeen: newStatus === 'offline' ? 'Только что' : 'Сейчас' }
          : member
      )
    })));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'online': return 'default';
      case 'afk': return 'secondary';
      case 'offline': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'afk': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const selectedFactionData = factions.find(f => f.id === selectedFaction);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold neon-text">Журнал активности фракций</h2>
          <p className="text-muted-foreground">Отслеживание активности членов фракций в реальном времени</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Обновлено: {currentTime.toLocaleTimeString('ru-RU')}
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="hover:neon-glow transition-all duration-300">
                <Icon name="Settings" className="mr-2 h-4 w-4" />
                Админ панель
              </Button>
            </DialogTrigger>
            <DialogContent className="cyber-border max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="neon-text">Админ панель - Мониторинг активности</DialogTitle>
                <DialogDescription>
                  Полный обзор активности всех фракций на сервере
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Обзор</TabsTrigger>
                  <TabsTrigger value="factions">Фракции</TabsTrigger>
                  <TabsTrigger value="logs">Логи</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="cyber-border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Общая активность</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary">
                          {factions.reduce((acc, f) => acc + f.onlineCount, 0)} / {factions.reduce((acc, f) => acc + f.totalMembers, 0)}
                        </div>
                        <Progress value={(factions.reduce((acc, f) => acc + f.onlineCount, 0) / factions.reduce((acc, f) => acc + f.totalMembers, 0)) * 100} className="mt-2" />
                      </CardContent>
                    </Card>
                    
                    <Card className="cyber-border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Активных фракций</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary">
                          {factions.filter(f => f.onlineCount > 0).length} / {factions.length}
                        </div>
                        <p className="text-sm text-muted-foreground">фракций с участниками онлайн</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="cyber-border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Средняя активность</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary">
                          {Math.round((factions.reduce((acc, f) => acc + f.onlineCount, 0) / factions.length))}
                        </div>
                        <p className="text-sm text-muted-foreground">игроков на фракцию</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="cyber-border">
                    <CardHeader>
                      <CardTitle>Активность по фракциям</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {factions.map(faction => (
                          <div key={faction.id} className="flex items-center justify-between p-3 rounded-lg bg-card border">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full bg-${faction.color}-500`}></div>
                              <div>
                                <p className="font-medium">{faction.name}</p>
                                <p className="text-sm text-muted-foreground">{faction.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{faction.onlineCount} / {faction.totalMembers}</p>
                              <Progress value={(faction.onlineCount / faction.totalMembers) * 100} className="w-20 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="factions" className="space-y-4">
                  {factions.map(faction => (
                    <Card key={faction.id} className="cyber-border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full bg-${faction.color}-500`}></div>
                            <span>{faction.name}</span>
                          </CardTitle>
                          <Badge variant="outline">{faction.onlineCount} / {faction.totalMembers}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {faction.members.slice(0, 5).map(member => (
                            <div key={member.id} className="flex items-center justify-between p-2 rounded border">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{member.name}</p>
                                  <p className="text-xs text-muted-foreground">{member.rank}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={getStatusBadgeVariant(member.status)} className="text-xs">
                                  {member.status === 'online' ? 'Онлайн' : member.status === 'afk' ? 'АФК' : 'Офлайн'}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{member.playTime}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="logs" className="space-y-4">
                  <Card className="cyber-border">
                    <CardHeader>
                      <CardTitle>Логи активности</CardTitle>
                      <CardDescription>Последние изменения статуса игроков</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { time: '14:32', action: 'John_Martinez подключился к серверу', faction: 'Полиция Майами', type: 'online' },
                          { time: '14:28', action: 'Maria_Rodriguez перешла в АФК режим', faction: 'Полиция Майами', type: 'afk' },
                          { time: '14:15', action: 'Tony_Soprano покинул сервер', faction: 'Мафия Картель', type: 'offline' },
                          { time: '14:12', action: 'Razor_Williams подключился к серверу', faction: 'Байкеры MC', type: 'online' },
                          { time: '14:08', action: 'Steel_Martinez вышел из АФК режима', faction: 'Байкеры MC', type: 'online' }
                        ].map((log, index) => (
                          <div key={index} className="flex items-center space-x-3 p-2 rounded border">
                            <span className="text-xs text-muted-foreground w-12">{log.time}</span>
                            <Icon 
                              name={log.type === 'online' ? 'User' : log.type === 'afk' ? 'Clock' : 'UserX'} 
                              className={`h-4 w-4 ${getStatusColor(log.type)}`} 
                            />
                            <div className="flex-1">
                              <p className="text-sm">{log.action}</p>
                              <p className="text-xs text-muted-foreground">{log.faction}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Faction Selector */}
      <div className="flex flex-wrap gap-2">
        {factions.map(faction => (
          <Button
            key={faction.id}
            variant={selectedFaction === faction.id ? "default" : "outline"}
            onClick={() => setSelectedFaction(faction.id)}
            className="hover:neon-glow transition-all duration-300"
          >
            <div className={`w-2 h-2 rounded-full bg-${faction.color}-500 mr-2`}></div>
            {faction.name}
            <Badge variant="secondary" className="ml-2">
              {faction.onlineCount}/{faction.totalMembers}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Selected Faction Details */}
      {selectedFactionData && (
        <Card className="cyber-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full bg-${selectedFactionData.color}-500`}></div>
                <div>
                  <CardTitle className="text-2xl">{selectedFactionData.name}</CardTitle>
                  <CardDescription>{selectedFactionData.type} фракция</CardDescription>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {selectedFactionData.onlineCount} / {selectedFactionData.totalMembers}
                </div>
                <p className="text-sm text-muted-foreground">участников онлайн</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-green-500/10 border-green-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-sm text-muted-foreground">Онлайн</p>
                        <p className="text-xl font-bold text-green-400">
                          {selectedFactionData.members.filter(m => m.status === 'online').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-500/10 border-yellow-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm text-muted-foreground">АФК</p>
                        <p className="text-xl font-bold text-yellow-400">
                          {selectedFactionData.members.filter(m => m.status === 'afk').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-red-500/10 border-red-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="UserX" className="h-5 w-5 text-red-400" />
                      <div>
                        <p className="text-sm text-muted-foreground">Офлайн</p>
                        <p className="text-xl font-bold text-red-400">
                          {selectedFactionData.members.filter(m => m.status === 'offline').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Members List */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Участники фракции</h3>
                {selectedFactionData.members.map(member => (
                  <Card key={member.id} className="cyber-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.rank}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">Время игры: {member.playTime}</p>
                            <p className="text-xs text-muted-foreground">Был в сети: {member.lastSeen}</p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant={member.status === 'online' ? 'default' : 'outline'}
                              onClick={() => updatePlayerStatus(member.id, 'online')}
                              className="hover:neon-glow transition-all duration-300"
                            >
                              <Icon name="User" className="h-4 w-4 mr-1" />
                              Онлайн
                            </Button>
                            
                            <Button
                              size="sm"
                              variant={member.status === 'afk' ? 'secondary' : 'outline'}
                              onClick={() => updatePlayerStatus(member.id, 'afk')}
                              className="hover:neon-glow transition-all duration-300"
                            >
                              <Icon name="Clock" className="h-4 w-4 mr-1" />
                              АФК
                            </Button>
                            
                            <Button
                              size="sm"
                              variant={member.status === 'offline' ? 'destructive' : 'outline'}
                              onClick={() => updatePlayerStatus(member.id, 'offline')}
                              className="hover:neon-glow transition-all duration-300"
                            >
                              <Icon name="UserX" className="h-4 w-4 mr-1" />
                              Вышел
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FactionActivity;