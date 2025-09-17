public class JSON2Apex {

	public PersonalDetails personalDetails;

	public class Emails {
		public List<String> personal;
		public List<String> business;
	}

	public class PersonalDetails {
		public Name name;
		public List<String> mobiles;
		public String gender;
		public Name fatherName;
		public String employmentType;
		public Emails emails;
	}

	public class Name {
		public String middle;
		public String last;
		public String first;
	}

	
	public static JSON2Apex parse(String json) {
		return (JSON2Apex) System.JSON.deserialize(json, JSON2Apex.class);
	}
}