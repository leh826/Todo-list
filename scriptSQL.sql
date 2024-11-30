--Criando tabela
CREATE TABLE task(
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
custo MONEY NOT NULL,
data_limite DATE NOT NULL,
ordem_apresentacao INT
)

  --Criando função para usar no gatilho
CREATE OR REPLACE FUNCTION set_ordem_apresentacao()
RETURNS TRIGGER AS $$
BEGIN
  -- Atribui o próximo número sequencial para ordem_apresentacao
  NEW.ordem_apresentacao := (SELECT COALESCE(MAX(ordem_apresentacao), 0) + 1 FROM public.task);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--criando gatilho para inserir valor automaticamente
CREATE TRIGGER trigger_set_ordem_apresentacao
BEFORE INSERT ON public.task
FOR EACH ROW
EXECUTE FUNCTION set_ordem_apresentacao();

-- Inserindo dados para teste
INSERT INTO task (nome, custo, data_limite)
VALUES 
('Planejamento Inicial', '500.00', '2024-12-01'),
('Execução do Projeto', '1500.75', '2024-12-15'),
('Revisão Final', '300.00', '2024-12-20');

SELECT * FROM task

  --Adicionando permissões para API
CREATE ROLE anon WITH LOGIN PASSWORD 'postgres';

GRANT CONNECT ON DATABASE tasks TO <role>;
GRANT USAGE ON SCHEMA public TO <role>;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO <role>;

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE public.task TO <role>;

GRANT USAGE, SELECT ON SEQUENCE task_id_seq TO <role>;
