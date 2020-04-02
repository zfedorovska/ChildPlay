import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Activity } from './activity';

export class ActivityData implements InMemoryDbService {

  createDb() {
    const activities: Activity[] = [
      {
        id: 1,
        activityName: 'Dropping in the Bucket',
        activityAge: '9 months',
        description: `Drop a block or a toy in the bucket. When the toy/block touches the
        bottom of the bucket, you can say “dhap”(for instance). Repeat the same for a few more
        times. Then drop another block or a toy but this time remains silent while doing so.
        Just see whether she tries imitating the word. Let her also drop the toys or blocks
        inside the bucket or empty out the bucket. `,
        skillDevelopment: 'This activity develops fine motor skills as well as language skills.',
        starRating: 3.2,
        imageUrl: 'assets/images/bucket.png',
        tags: ['bucket', '9 months']
      },
      {
        id: 2,
        activityName: 'Squeak and Hide',
        activityAge: '9 months',
        description: `Take a squeaky toy and squeeze it so that it makes a squeaky sound. Hide it
         behind your back or under the blanket or behind the cushion. Let your baby try to look for
          it. You can do the activity until the time she does not lose interest in it.`,
        skillDevelopment: `this simple game is great for cognitive development in babies.
        It also helps in developing auditory skills and object permanence.`,
        starRating: 3,
        imageUrl: 'assets/images/hideAndSqueak.png',
        tags: ['Squeak', '9 months']
      },
      {
        id: 3,
        activityName: 'Ball Rolling',
        activityAge: '9 months',
        description: `Roll a medium sized blow-up ball towards your baby. See whether he stops it or not.
        Then encourage her to roll it back. Even if she does not, applaud her.
        You can ask your spouse to join in.`,
        skillDevelopment: 'This activity develops gross motor skills, teaches about taking turns and imitating.',
        starRating: 5,
        imageUrl: 'assets/images/ball.png',
        tags: ['ball', '9 months']
      },
      {
        id: 4,
        activityName: 'Hide-and-Seen',
        activityAge: '9 months',
        description: `Place a big carton and make sure it is comfortable without anything
        pricky inside. You can keep a soft towel or blanket inside.
        Place your baby inside and duck her in. Then pretend as if you cannot find her.
        On seeing her, give a squeal of excitement. Allow her to explore the box.`,
        skillDevelopment: `This activity strengthens visual tracking, develops gross motor skills
        and social skills and teaches object permanence.`,
        starRating: 4,
        imageUrl: 'assets/images/hideAndSeek.png',
        tags: ['hide', '9 months']
      },
      {
        id: 5,
        activityName: 'Making Stacks',
        activityAge: '10 months',
        description: `Initially, you may have to make a stack yourself and let the child knock
         it down. Soon, you will find the baby trying to build the tower up on his own,
         so that he can knock it down. At the start, try using larger blocks, so that the task
          of building the tower is easy for your child. However, you can use smaller blocks
           as time passes, so that it becomes more challenging.`,
        skillDevelopment: `Improves motor skills and dexterity of the child, along with his memory,
         problem-solving and cognitive abilities.`,
        starRating: 5,
        imageUrl: 'assets/images/stacks.png',
        tags: ['stacks', '10 months']
      },
      {
        id: 6,
        activityName: 'Obstacle Course',
        activityAge: '10 months',
        description: `Mock up an obstacle course at home using everyday items, like solid boxes,
         stacks of large books, pillows or even chairs for your baby to traverse.`,
        skillDevelopment: `This helps improve motor skills, navigation, hand-eye coordination,
         memory and cognitive abilities of the child.`,
        starRating: 4,
        imageUrl: 'assets/images/obstacles.png',
        tags: ['obstacle', '10 months']
      }
    ];
    return { activities };
  }
}
