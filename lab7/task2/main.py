from models import Animal,Dog,Cat
def main():
    animal=Animal("Bobby",5,"Unknown")
    dog=Dog("Bella",4,"golden Retriever")
    cat=Cat("Queen",6,"white")
    animals=[animal,dog,cat]
    for a in animals:
        print(a)
        print(a.eat())
        print(a.sleep())
        print(a.speak())
        if isinstance(a,Dog):
            print(a.fetch("ball"))
        if isinstance(a,Cat):
            print(a.climb())
        print("-" * 30)
if __name__ =="__main__":
    main()