namespace $.$$ {
	export class $habr_notes extends $.$habr_notes {
		@ $mol_mem
		text(val?: any) {
			return $mol_state_local.value('note', val) || ""
		}
	}
}
