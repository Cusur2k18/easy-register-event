import { Container } from 'unstated'
import Api from '../utils/api'
import parseRes from '../utils/parseResponse'
import LocalStore from './LocalStore'
import swal from 'sweetalert2'

export default class AuthStore extends Container {
  state = {
    filteredEvents: [],
    todayEvents: [],
    singleEvent: {},
    currentEnrollment: {},
    totalEvents: 0,
    eventsPerPage: 10,
    currentPage: 1,
    loadingAllEvents: false,
    loadingTodayEvents: false,
    loadingSingle: false,
    loadingAction: false
  }

  /**
   * Loadings
   * @memberOf AuthStore
   */
  setTodayLoading = loadingTodayEvents => {
    this.setState({ loadingTodayEvents })
  }

  setAllLoading = loadingAllEvents => {
    this.setState({ loadingAllEvents })
  }

  setSingleLoading = loadingSingle => {
    this.setState({ loadingSingle })
  }

  setloadingAction = loadingAction => {
    this.setState({ loadingAction })
  }

  setPaginationInfo = headers => {
    this.setState({ totalEvents: parseInt(headers.total, 10), eventsPerPage: parseInt(headers.perPage, 10), currentPage: parseInt(headers.currentPage, 10) })
  }

  /**
   * Set properties
   * @memberOf AuthStore
   */
  setFilteredEvents = filteredEvents => {
    this.setState({ filteredEvents })
  }

  setTodayEvents = todayEvents => {
    this.setState({ todayEvents })
  }

  setSingleEvent = singleEvent => {
    let currentEnrollment = LocalStore.getEnrollments().find(er => er.event_id === singleEvent.id)
    if (!currentEnrollment) {
      currentEnrollment = {}
    }
    this.setState({ singleEvent, currentEnrollment })
  }

  getTodayEvents = () => {
    this.setTodayLoading(true)
    Api.get('/events', { params: { filter_type: 'today_events', per_page: 5 }})
      .then(res => parseRes(res))
      .then(response => {
        this.setTodayLoading(false)
        this.setTodayEvents(response.data)
      })

  }

  getFilteredEvents = (params = { type: 'get_all' }) => {
    let filter = params.value ? { filter_type: params.type, value: params.value } : { filter_type: params.type }
    filter = params.page ? { ...filter, page: params.page } : filter
    this.setAllLoading(true)
    Api.get('/events', { params: filter } )
      .then(res => parseRes(res))
      .then(response => {
        this.setAllLoading(false)
        this.setFilteredEvents(response.data)
        this.setPaginationInfo(response.meta)
      })
  }

  getEventByUuid = uuid => {
    const filter = { filter_type: 'by_uuid' }
    this.setSingleLoading(true)
    Api.get(`/events/${uuid}`, { params: filter })
      .then(res => parseRes(res))
      .then(response => {
        if (response.error) return new Error('Error while fetching')

        this.setSingleEvent(response.data)
        this.setSingleLoading(false)
      })
  }

  getEventById = id => {
    const filter = { filter_type: 'by_id' }
    this.setSingleLoading(true)
    Api.get(`/events/${id}`, { params: filter })
      .then(res => parseRes(res))
      .then(response => {
        this.setSingleEvent(response.data)
        this.setSingleLoading(false)
      })
  }

  getAllUserEnrollments = () => {
    const userId = LocalStore.getUser().id
    this.setloadingAction(true)
    Api.get('/students/enrollments', { params: { id: userId }})
      .then(res => parseRes(res))
      .then(response => {
        if (response.error || response.data.error) return console.error('Error on the enroll')
        LocalStore.setEnrollments([...response.data])
        this.setloadingAction(false)
      })
  }

  doEnrollment = eventId => {
    const userId = LocalStore.getUser().id

    swal({
      title: 'Continuar con registro?',
      text: 'Un vez hecho el registro se te generara un boleto que te servira para marcar asistencia',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si! continuar con mi registro',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Api.post('/events/enroll', { student_id: userId, event_id: eventId }, { headers: {'Content-Type': 'application/json'} })
          .then(res => parseRes(res))
          .then(response => {
            let data = {}
            if (response.error) {
              data = {
                type: 'error',
                title: 'Error!',
                body: 'Hubo un error haciendo el registro'
              }
            }
            LocalStore.setEnrollments([...LocalStore.getEnrollments(), response.data])
            data = {
              type: 'success',
              title: 'Listo',
              body: 'Tu registro esta hecho! Te esperamos en el evento, \n No olvide imprimir tu boleto y llevarlo o no obtendras asistencia.'
            }
            return data
          })
          .then(data => {
            swal({
              type: data.type,
              title: data.title,
              text: data.body,
              onClose: () => {
                this.getEventById(eventId)
              }
            })
          })
      }
    })
  }

  deleteEnrollment = () => {
    swal({
      title: '¿Estas seguro que quieres borrar tu registro a este evento?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Si estoy seguro! Borra mi registro',
      cancelButtonText:'No! no borres mi registro'
    }).then((result) => {
     if (result.value) {
      const { singleEvent } = this.state
      const allEnrollments = LocalStore.getEnrollments()
      const singleEnrollment = allEnrollments.find( e => e.event_id === singleEvent.id )
      if (singleEnrollment) {
        LocalStore.setEnrollments(allEnrollments.filter(er => er.id !== singleEnrollment.id))
        this.setloadingAction(true)
        Api.delete(`/events/rescind`,  { params: {event_id: singleEvent.id, enroll_id: singleEnrollment.id} }, { headers: {'Content-Type': 'application/json'} })
          .then(res => parseRes(res))
          .then(response => {
            this.setloadingAction(false)
            swal({
              title: 'Listo!',
              text: 'Tu registro se borro!',
              type: 'success',
              onClose: () => {
                this.getEventById(singleEvent.id)
              }
            })
          })
      }
     }
    })
  }
}
