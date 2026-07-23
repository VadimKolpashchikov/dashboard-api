function Component(id: number) {
  console.log('Init @Component');

  return <T extends { new (...args: any[]): {} }>(target: T) => {
    console.log('Run Component');

    return class extends target {
      id = id;
    };
  };
}

function Logger() {
  console.log('Init @Logger');

  return (target: Function) => {
    console.log('Run Logger');
  };
}

function Method(
  target: Object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor,
) {
  console.log(propertyKey);
  const originValue = propertyDescriptor.value;

  propertyDescriptor.value = function (...args: any[]) {
    const [first, ...restArgs] = args;
    return originValue.apply(this, [first * 10, ...restArgs]);
  };
}

function Prop(target: any, key: string) {
  const secretKey = Symbol(`_${key}`);

  Object.defineProperty(target, key, {
    get() {
      console.log('Get!');
      return this[secretKey];
    },
    set(newValue: number) {
      console.log('Set!');
      this[secretKey] = newValue;
    },
    enumerable: true,
    configurable: true,
  });
}

function Param(target: any, key: string, index: number) {}

@Logger()
@Component(1)
export class User {
  @Prop id: number;

  @Method
  updateId(@Param newId: number): number {
    this.id = newId;
    return this.id;
  }
}

console.log(new User().id);
const d = new User();
console.log(d.updateId(2));
console.log(d.id);
