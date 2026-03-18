class Animal:  
    def __init__(self,name,age,species):
        self.name=name
        self.age=age
        self.species=species
    def eat(self):
        return f"{self.name} is eating."
    def sleep(self):
        return f"{self.name}is sleeping."
    def speak(self):
        return f"..."
    def __str__(self):
        return f"{self.name} is {self.age} years old {self.species}"
    
class Dog(Animal):
    def __init__(self,name,age,breed):
        super().__init__(name,age,"Dog")    
        self.breed=breed
    def fetch(self,item):
        return f"{self.name} is fatching {item}!"
    def speak(self):
        return "Woof"
    def __str__(self):
        return f"{self.name} is {self.age} years old {self.breed} dog"
    
class Cat(Animal):
    def __init__(self,name,age,color):
        super().__init__(name,age,"Cat")
        self.color=color
    def climb(self):
        return f"{self.name} is climbing a tree"
    def speak(self):
        return "Meow"
    def __str__(self):
        return f"{self.name} is {self.age} years old {self.color} cat"
    