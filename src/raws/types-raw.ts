{
  let a = 5;
  let b = '';

  let c = a + b;
  let c2: number = a + Number(b);
  let d = true;

  let names: string[] = ['qw', 'er'];
  let ages: number[] = [1, 2];

  let tup: [number, string] = [1, '1'];

  let e: any = 3;
  e = '3';
  e = false;

  let anyArr: any[] = ['212', 212, false, []];

  function greet(name: string): string {
    return `Hello ${name}`;
  }

  names.map((x: string): string => x);

  function coord(coord: { lat: number; long?: number }) {
    if (coord.long !== undefined) {
      return true;
    }

    return false;
  }
}
// Union
{
  let universalId: number | string = 1234567890;
  universalId = '1234567890';

  function printId(id: number | string) {
    if (typeof id === 'string') {
      console.log(id.toUpperCase());
    } else {
      console.log(id);
    }
  }

  function helloUser(user: string | string[]) {
    if (Array.isArray(user)) {
      console.log(`Hi ${user.join(', ')}`);
    } else {
      console.log(`Hello ${user}`);
    }
  }
}
// Types & Interface
{
  type Coord = { lat: number; lon: number };

  interface ICoord {
    lat: number;
    lon: number;
  }

  type UniqId = number | string;

  function compute(coord: Coord | ICoord) {}

  interface IAnimal {
    name: string;
  }

  interface IDog extends IAnimal {
    tail: boolean;
  }

  const dog: IDog = {
    tail: false,
    name: 'gavster',
  };

  type Animal = {
    name: string;
  };

  type Dog = Animal & { tail: boolean };

  const dog2: Dog = {
    tail: true,
    name: 'gavster2',
  };

  interface IDog {
    tail2?: number;
  }
}
// Literal types
{
  let b: 'hi' = 'hi';

  type Direction = 'left' | 'right';

  function move(direction: Direction): -1 | 0 | 1 {
    switch (direction) {
      case 'left':
        return -1;
      case 'right':
        return 1;
      default:
        return 0;
    }
  }

  move('left');

  interface Iconnection {
    host: string;
    port: number;
  }
  function connect(connection: Iconnection | 'default') {}

  connect('default');

  const connection = {
    host: 'localhost',
    protocol: 'https' as 'http',
    protocol2: 'https' as const,
  };

  function connect2(host: string, protocol: 'http' | 'https') {}

  connect2(connection.host, connection.protocol);
}
// Enums
{
  type Direction = 'left' | 'right';

  enum DirectionEnum {
    Left = 'left',
    Right = 'right',
  }

  DirectionEnum.Left;

  function move(direction: DirectionEnum) {
    switch (direction) {
      case DirectionEnum.Left:
        return -1;
      case DirectionEnum.Right:
        return 1;
      default:
        return 0;
    }
  }

  function objMod(obj: { Left: string }) {}

  objMod(DirectionEnum);

  const enum DirectionEnum2 {
    Up,
    Down,
  }

  const direction2 = DirectionEnum2.Up;
}
// Generics
{
  interface IHasLength {
    length: number;
  }

  function log<T extends IHasLength, K>(obj: T, arr: K[]): K[] {
    console.log(obj.length);
    return arr;
  }

  // log<string, number>('1', [1]);

  interface IUser {
    name: string;
    age?: number;
    bid: <T>(sum: T) => boolean;
  }
}
// Class
{
  class Coord {
    lat: number;
    lon: number;

    constructor(lat: number, lon: number) {
      this.lat = lat;
      this.lon = lon;
    }

    computeDistance(lat: number, lon: number): number {
      return 0;
    }

    protected test() {
      if (this.lat > 0) {
      }
    }
  }
  const point = new Coord(1, 2);

  class MapLocation extends Coord {
    private _name: string;

    constructor(lat: number, lon: number, name: string) {
      super(lat, lon);
      this._name = name;
    }

    override computeDistance(lat: number, lon: number): number {
      console.log(this._name);
      return 0;
    }

    get name(): string {
      return this._name;
    }
    set name(value: string) {
      this._name = value;
    }
  }

  const mapLocation = new MapLocation(1, 2, 'test');

  interface ILoggerService {
    log(value: string): void;
  }

  class Logger implements ILoggerService {
    public log(value: string): void {
      console.log(value);
    }

    private makeError() {}
  }

  class MyClass<T> {
    a: T;
  }

  const b = new MyClass<string>();
  b.a;

  abstract class Base {
    print(s: string) {
      console.log(s);
    }

    abstract error(s: string): void;
  }

  class BaseExtended extends Base {
    error(s: string): void {
      throw new Error('Method not implemented.');
    }
  }

  class Animal {
    name: string;
  }

  class Dog {
    name: string;
    tail: boolean;
  }

  const puppy: Animal = new Dog();
}
// Other types
{
  let a = 'Hello';
  let b: typeof a;

  type Coord = {
    lat: number;
    lon: number;
  };

  type P = keyof Coord;
  let c: P = 'lon';

  function log(a: string | null) {
    if (a === null) {
    } else {
      a.toLowerCase();
    }
  }

  const aa: bigint = BigInt(1);
  const bb: symbol = Symbol('foo');
}
