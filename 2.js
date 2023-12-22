console.log("КИРИЛЕНКО ЯРОСЛАВ ВАРІАНТ 3");


// Клас, який представляє загальний інтерфейс стану
class ConnectionState {
  connect(speed) {
    console.log(`Швидкість підключення ${speed} Мбіт/сек`);
  }

  disconnect() {
    console.log("Роз'єднано");
  }

  handlePayment(account, amount) {
    // Логіка списання абонплати
  }
}

// Клас, який представляє стан заборгованості
class OverdueState extends ConnectionState {
  connect(speed) {
    console.log("Доступ заблоковано. Заплатіть заборгованість.");
  }

  handlePayment(account, amount) {
    // Логіка погашення заборгованості

    console.log(`Погашено ${amount} грн. Заборгованість врегульовано.`);

    account.changeState(new ConnectedState());
  }
}




// Для вирішення цієї задачі можна використовувати шаблон "Стан" (State). 
// Цей шаблон дозволяє об'єднати різні стани об'єкта в окремі 
// класи, які можуть змінювати його поведінку в залежності від внутрішнього стану



// Клас, який представляє стан підключення
class ConnectedState extends ConnectionState {
  handlePayment(account, amount) {
    // Логіка списання абонплати
    if (account.balance - amount < 0) {
      console.log("Недостатньо коштів на рахунку. Заборгованість створена.");

      account.changeState(new OverdueState());
    } else {
      console.log(`Погашено ${amount} грн. Абонплата списана.`);

      account.balance -= amount;
    }
  }
}

// Клас рахунку абонента провідного інтернету
class InternetAccount {
  constructor(balance, monthlyFee, maxSpeed) {
    this.balance = balance;
    this.monthlyFee = monthlyFee;
    this.maxSpeed = maxSpeed;
    this.state = new ConnectedState(); // Початковий стан - підключено
  }

  changeState(newState) {
    this.state = newState;
  }

  connect() {
    this.state.connect(this.maxSpeed);
  }

  disconnect() {
    this.state.disconnect();
  }

  handlePayment(amount) {
    this.state.handlePayment(this, amount);
  }
}

// У цьому прикладі ДОЦІЛЬНО використовувати шаблон "Стан" 
// для визначення різних станів рахунку та зміни його 
// поведінки в залежності від внутрішнього стану.




// Приклад використання:
const account = new InternetAccount(100, 50, 100);
account.connect(); // Швидкість підключення 100 Мбіт/сек

account.handlePayment(30); // Погашено 30 грн. Абонплата списана.

account.handlePayment(80); // Недостатньо коштів на рахунку. Заборгованість створена.
account.connect(); // Доступ заблоковано. Заплатіть заборгованість.

account.handlePayment(60); // Погашено 60 грн. Заборгованість врегульовано.
account.connect(); // Швидкість підключення 100 Мбіт/сек (заборгованості немає)
