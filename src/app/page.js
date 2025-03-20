import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const getRecipes = async () => {
  const result = await fetch('http://localhost:4000/recipes');
  return result.json();
};

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main>
      <div className='grid grid-cols-3 gap-8'>
        {recipes.map((item, i) => (
          <Card key={i} className='flex flex-col justify-between'>
            <CardHeader className='flex-row gap-4 items-center'>
              <Avatar>
                <AvatarImage src={`/img/${item.image}`} alt='recipe image' />
                <AvatarFallback>{item.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>
                  {item.time}&nbsp;mins to cook.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button>view recipe </Button>
              {item.vegan && <Badge variant='secondary'>vegan</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
