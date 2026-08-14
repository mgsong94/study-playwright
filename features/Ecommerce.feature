Feature: Ecommerce validations

Scenario: Placing the order
    Given a login to Ecommerce application with "anshika@gmail.com" and 
    When Add "zara coat 3" to cart
    Then Verify "zara coat 3" is displayed in the cart
    When Enter valid details and Place the order
    Then Verify order in present in the OrderHistory
