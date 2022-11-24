interface NextOfKin {
  Id: number;
  IdCard: string;
  Name: string;
  Surname: string;
  ContactNumber1: string;
  ContactNumber2: string;
}

interface Condition {
  Name: string;
  Notes: string;
}

interface Alergy {
  Name: string;
  Notes: string;
}

interface Medication {
  Name: string;
  Notes: string;
  StartDate: string;
  EndDate: string;
}

interface Medical {
  Conditions: Condition[];
  Alergies: Alergy[];
  Medication: Medication[];
}

interface DataType {
  Id: number;
  IdCard: string;
  Gender: string;
  Name: string;
  Surname: string;
  DateOfBirth: string;
  Address: string;
  Postcode: string;
  ContactNumber1: string;
  ContactNumber2: string;
  NextOfKin: NextOfKin[];
  Medical: Medical;
}
interface columns {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: string) => JSX.Element;
}
