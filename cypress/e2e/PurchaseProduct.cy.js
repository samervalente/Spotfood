
describe("Testes para o fluxo de compra de um produto", () => {
    it("Compra um produto aleatório", () => {
      const clientData = {
        email: "samervalente2@gmail.com",
        password: "123",
      }

      const orderData = {
        cep:67133260,
        number:151,
        complement:"Ao lado da FM PNEUS",
        observation:"Sem salada, por favor"
      }
  
      cy.visit("http://localhost:3000/");
  
      cy.get('[data-test-id="input-login-email"]').type(clientData.email)
      cy.get('[data-test-id="input-login-password"]').type(clientData.password)
      cy.get('[data-test-id="button-login-enter"]').click()
  
  
      cy.contains('Explorar restaurante').click({multiple:true})
      cy.contains('Comprar').click()

      cy.get('[data-test-id="button-add"]').click()
   
      cy.get('[data-test-id="cep"]').type(orderData.cep)
      cy.get('[data-test-id="number"]').type(orderData.number)
      cy.get('[data-test-id="complement"]').type(orderData.complement)
      cy.get('[data-test-id="observation"]').type(orderData.observation)

      cy.contains("Finalizar compra").click()

      cy.url().should("equal","http://localhost:3000/order/8")
      
      
    });
  });
  