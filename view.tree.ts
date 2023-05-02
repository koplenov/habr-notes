namespace $.$$ {
	export class $habr_notes extends $.$habr_notes {
		@$mol_mem
		text( val?: any ) {
			return this.store().str( val ) || ""
		}

		@$mol_mem
		store() {
			// через модуль клиента мы обращаемся к хранилищу (миру),
			// используем тип $hyoo_crowd_reg - он позволяет атомарно хранить значения (строки, числа, булы)
			// запрашиваем участок с указанным id
			return this.yard().world().Fund( $hyoo_crowd_reg ).Item( this.current_note_id() )
		}

		@$mol_mem
		current_note_id() {
			// мы считываем id заметки из урла, или, если пустой, указываем новый свой
			const id = this.$.$mol_state_arg.value( '' ) || this.yard().land_grab().id()
			// задаём в урл текущий id - чтобы мы могли его сразу же скопировать и поделиться ссылкой
			this.$.$mol_state_arg.value( '', id )
			return id as $mol_int62_string
		}

		@$mol_mem
		i_have_can_mod() {
			// проверка наличия прав на редактирование
			return this.yard().land( this.current_note_id() ).allowed_mod()
		}
	}
}
