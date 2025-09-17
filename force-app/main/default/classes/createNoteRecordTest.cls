@IsTest
public class createNoteRecordTest {
    @IsTest
    static void createNoteRecordTest() {
        // Test data setup
        String title = 'Test Title';
        String body = 'Test Body';

        // Create a test user
        User testUser = [SELECT Id FROM User WHERE Profile.Name = 'System Administrator' LIMIT 1];

        // Run the test as the test user
        System.runAs(testUser) {
            // Create a new note record
            Test.startTest();
            Boolean result = createNoteRecord.createRecord(title, body);
            Test.stopTest();

            // Verify the result
            System.assertEquals(true, result, 'Note record should have been created');
        }
    }
}