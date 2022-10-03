/* eslint-disable react/no-unescaped-entities */
import {
  ButtonContainer,
  CancelButton,
  Container,
  Content,
  Description,
  ExampleNoteContainer,
  NewNoteContainer,
  ReminderDate,
  SaveButton,
  TagContainer,
  Title,
  NoteContainer,
  ImgContainer,
  TopBar,
  Menu,
  NoteContent,
  BottomBar
} from './style'
import { Header } from '../../components/Header'
import { SideBarContainer } from '../HomePage/style'
import { Sidebar } from '../../components/Sidebar'
import noteImg from '../../assets/note.svg'
import menuImg from '../../assets/menu.svg'
import calenderImg from '../../assets/calender.svg'
import { useProtectedPage } from '../../hooks/useProtectedPage'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useMutation } from 'react-query'
import { api } from '../../services/api'
import { useForm } from '../../hooks/useForm'

type CreateNoteData = {
  form: () => void
}

export const NewNotePage = () => {
  useProtectedPage()
  const { form } = useForm({
    initialState: {
      description: ''
    }
  })

  const createNote = useMutation(async (form: CreateNoteData) => {
    const response = await api.post('/task', form)

    return response.data
  })

  const navigate = useNavigate()
  const [keyboard, setKeyboard] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyboard(event.target.value)
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    await createNote.mutateAsync(form)
  }

  return (
    <>
      <SideBarContainer>
        <Sidebar />
      </SideBarContainer>

      <Container>
        <Header />
        <NewNoteContainer onSubmit={(event) => handleSubmit(event)}>
          <Content>
            <Description onChange={handleChange}>
              <p>Descrição</p>
              <textarea />
            </Description>

            {/* <ReminderDate>
              <p>Data do Lembrete</p>
              <input type="date" placeholder="06/04/2022" />
            </ReminderDate> */}

            {/* <TagContainer>
              <p>Tag</p>
              <input type="text" placeholder="Digite uma tag" />
            </TagContainer> */}

            <ButtonContainer>
              <CancelButton onClick={() => navigate('/home')}>
                Cancelar
              </CancelButton>
              <SaveButton type="submit">Salvar</SaveButton>
            </ButtonContainer>
          </Content>

          <ExampleNoteContainer>
            <NoteContainer>
              <TopBar>
                <ImgContainer>
                  <img src={noteImg} alt="Note" />
                </ImgContainer>

                <Menu>
                  <img src={menuImg} alt="Menu" />
                </Menu>
              </TopBar>

              <NoteContent onChange={handleChange}>
                <h3>Nota de Exemplo</h3>

                <p>{keyboard}</p>
              </NoteContent>

              <BottomBar>
                <img src={calenderImg} alt="Calender" />
                <p>12 Jan 2022</p>
              </BottomBar>
            </NoteContainer>
          </ExampleNoteContainer>
        </NewNoteContainer>
      </Container>
    </>
  )
}
