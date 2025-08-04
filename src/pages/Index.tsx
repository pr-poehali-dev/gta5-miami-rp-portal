import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const newsItems = [
    {
      id: 1,
      title: "Обновление сервера v2.5",
      description: "Новые машины, оружие и локации уже доступны!",
      date: "3 августа 2025",
      category: "Обновления"
    },
    {
      id: 2,
      title: "Турнир по гонкам",
      description: "Участвуй в гонках и выигрывай крутые призы",
      date: "1 августа 2025",
      category: "События"
    },
    {
      id: 3,
      title: "Новая фракция: Полиция",
      description: "Теперь можно устроиться на работу в полицию Майами",
      date: "28 июля 2025",
      category: "Новости"
    }
  ];

  const features = [
    {
      icon: "Car",
      title: "Уникальные машины",
      description: "Более 150 эксклюзивных автомобилей"
    },
    {
      icon: "Users",
      title: "Активное сообщество",
      description: "Более 5000 игроков онлайн"
    },
    {
      icon: "Home",
      title: "Недвижимость",
      description: "Покупай дома и бизнесы в Майами"
    },
    {
      icon: "Shield",
      title: "Безопасность",
      description: "Защита от читеров и нарушителей"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold neon-text">Miami RP</div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-primary transition-colors">Главная</a>
            <a href="#news" className="hover:text-primary transition-colors">Новости</a>
            <a href="#start" className="hover:text-primary transition-colors">Как начать</a>
            <a href="#forum" className="hover:text-primary transition-colors">Форум</a>
            <a href="#rules" className="hover:text-primary transition-colors">Правила</a>
          </div>

          <div className="flex items-center space-x-4">
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="hover:neon-glow transition-all duration-300">
                  <Icon name="User" className="mr-2 h-4 w-4" />
                  Личный кабинет
                </Button>
              </DialogTrigger>
              <DialogContent className="cyber-border">
                <DialogHeader>
                  <DialogTitle className="neon-text">Вход в личный кабинет</DialogTitle>
                  <DialogDescription>
                    Введите свои данные для входа на сервер
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="cyber-border" />
                  </div>
                  <div>
                    <Label htmlFor="password">Пароль</Label>
                    <Input id="password" type="password" className="cyber-border" />
                  </div>
                  <Button className="w-full hover:neon-glow transition-all duration-300">
                    Войти
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" className="hover:neon-glow transition-all duration-300">
                  <Icon name="Settings" className="mr-2 h-4 w-4" />
                  Админ
                </Button>
              </DialogTrigger>
              <DialogContent className="cyber-border">
                <DialogHeader>
                  <DialogTitle className="neon-text">Админ панель</DialogTitle>
                  <DialogDescription>
                    Только для администраторов сервера
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" type="email" className="cyber-border" />
                  </div>
                  <div>
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input id="admin-password" type="password" className="cyber-border" />
                  </div>
                  <Button className="w-full hover:neon-glow transition-all duration-300">
                    Войти в админку
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/7cb9420d-68d4-4d23-91ff-8986d8cc79e9.jpg" 
            alt="Miami RP Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-8 px-4">
          <h1 className="text-6xl md:text-8xl font-bold neon-text animate-fade-in">
            MIAMI RP
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Окунись в мир роскоши и преступности в лучшем GTA 5 RP сервере
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 hover:neon-glow transition-all duration-300">
              <Icon name="Play" className="mr-2 h-5 w-5" />
              Начать играть
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 hover:neon-glow transition-all duration-300">
              <Icon name="Download" className="mr-2 h-5 w-5" />
              Скачать лаунчер
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 neon-text">Почему Miami RP?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="cyber-border hover:neon-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <Icon name={feature.icon} className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 neon-text">Последние новости</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <Card key={news.id} className="cyber-border hover:neon-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{news.category}</Badge>
                    <span className="text-sm text-muted-foreground">{news.date}</span>
                  </div>
                  <CardTitle className="text-xl">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{news.description}</CardDescription>
                  <Button variant="link" className="mt-4 p-0 h-auto text-primary">
                    Читать далее →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Start Section */}
      <section id="start" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 neon-text">Как начать играть</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="cyber-border text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <CardTitle>Скачай лаунчер</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Загрузи официальный лаунчер Miami RP с нашего сайта</p>
              </CardContent>
            </Card>

            <Card className="cyber-border text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <CardTitle>Регистрация</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Создай аккаунт и пройди простую регистрацию на сервере</p>
              </CardContent>
            </Card>

            <Card className="cyber-border text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <CardTitle>Играй!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Заходи на сервер и начинай свою историю в Майами</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Forum Section */}
      <section id="forum" className="py-20 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 neon-text">Форум сообщества</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Общайся с игроками, делись опытом и находи новых друзей в нашем активном сообществе
          </p>
          <Button size="lg" className="hover:neon-glow transition-all duration-300">
            <Icon name="MessageCircle" className="mr-2 h-5 w-5" />
            Перейти на форум
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 neon-text">Miami RP</h3>
              <p className="text-muted-foreground">
                Лучший GTA 5 RP сервер с уникальным игровым опытом
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#home" className="hover:text-primary transition-colors">Главная</a></li>
                <li><a href="#news" className="hover:text-primary transition-colors">Новости</a></li>
                <li><a href="#start" className="hover:text-primary transition-colors">Как начать</a></li>
                <li><a href="#forum" className="hover:text-primary transition-colors">Форум</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Правовая информация</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#rules" className="hover:text-primary transition-colors">Правила сервера</a></li>
                <li><a href="#terms" className="hover:text-primary transition-colors">Пользовательское соглашение</a></li>
                <li><a href="#privacy" className="hover:text-primary transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#oferta" className="hover:text-primary transition-colors">Оферта</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Связь с нами</h4>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="hover:neon-glow transition-all duration-300">
                  <Icon name="MessageCircle" className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="hover:neon-glow transition-all duration-300">
                  <Icon name="Users" className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="hover:neon-glow transition-all duration-300">
                  <Icon name="Mail" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 Miami RP. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;